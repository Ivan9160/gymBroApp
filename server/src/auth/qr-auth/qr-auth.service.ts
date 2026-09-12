import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import { nanoid } from "nanoid";
import { JwtService } from "@nestjs/jwt";

const QR_TTL_MS = 90 * 1000; 
const QR_KEY_PREFIX = "qr:";


type QrSessionStatus = "pending" | "scanned" | "confirmed";

interface QrSession {
    userId: string;
    status: QrSessionStatus;
}

@Injectable()
export class QrAuthService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private readonly jwtService: JwtService,
    ) {}

    async generate(userId: string): Promise<{ pairingCode: string; expiresAt: number }> {
        const pairingCode = nanoid(32);

        const session: QrSession = { userId, status: "pending" };

        await this.cache.set(`${QR_KEY_PREFIX}${pairingCode}`, session, QR_TTL_MS);

        return {
            pairingCode,
            expiresAt: Date.now() + QR_TTL_MS,
        };
    }

    async requestExchange(pairingCode: string): Promise<{ status: QrSessionStatus }> {
        const key = `${QR_KEY_PREFIX}${pairingCode}`;
        const session = await this.cache.get<QrSession>(key);

        if (!session) {
            throw new NotFoundException("QR code expired or invalid");
        }

        if (session.status === "pending") {
            const scannedSession: QrSession = { ...session, status: "scanned" };
            await this.cache.set(key, scannedSession, 60 * 1000); 
            return { status: "scanned" };
        }

        return { status: session.status };
    }

    async confirm(pairingCode: string, confirmingUserId: string): Promise<void> {
        const key = `${QR_KEY_PREFIX}${pairingCode}`;
        const session = await this.cache.get<QrSession>(key);

        if (!session) {
            throw new NotFoundException("QR code expired or invalid");
        }

        if (session.userId !== confirmingUserId) {
            throw new BadRequestException("You can only confirm your own QR code");
        }

        const confirmedSession: QrSession = { ...session, status: "confirmed" };

        await this.cache.set(key, confirmedSession, 30 * 1000);
    }


    async exchange(pairingCode: string): Promise<{ accessToken: string; refreshToken: string }> {
        const key = `${QR_KEY_PREFIX}${pairingCode}`;
        const session = await this.cache.get<QrSession>(key);

        if (!session) {
            throw new NotFoundException("QR code expired or invalid");
        }

        if (session.status !== "confirmed") {
            throw new BadRequestException("QR login not confirmed yet");
        }


        await this.cache.del(key);

        const accessToken = await this.jwtService.signAsync(
            { sub: session.userId },
            { expiresIn: "90d" },
        );

        return { accessToken, refreshToken: accessToken }; 
    }


    async status(pairingCode: string, userId: string): Promise<{ status: QrSessionStatus }> {
        const session = await this.cache.get<QrSession>(`${QR_KEY_PREFIX}${pairingCode}`);

        if (!session) {
            throw new NotFoundException("QR code expired or invalid");
        }

        if (session.userId !== userId) {
            throw new BadRequestException("You can only access your own QR session");
        }

        return { status: session.status };
    }
}