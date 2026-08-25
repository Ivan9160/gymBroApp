import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

interface JwtPayload {
    sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET is not set — refusing to start without it"
            );
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException("Unknown user");
        }

        return user;
    }
}