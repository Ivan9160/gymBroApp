import { Body, Controller, Post, UseGuards, Get, Query } from "@nestjs/common";
import { QrAuthService } from "./qr-auth.service";
import { ExchangeQrDto, ConfirmQrDto } from "./dto/qr-auth.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard"; // твій existing guard
import { CurrentUser } from "../decorators/get-user.decorator"; // твій existing decorator

@Controller("auth/qr")
export class QrAuthController {
    constructor(private readonly qrAuthService: QrAuthService) {}

    @UseGuards(JwtAuthGuard)
    @Post("generate")
    async generate(@CurrentUser() user: { id: string }) {
        return this.qrAuthService.generate(user.id);
    }

    @Post("request-exchange")
    async requestExchange(@Body() dto: ExchangeQrDto) {
        return this.qrAuthService.requestExchange(dto.pairingCode);
    }

    @UseGuards(JwtAuthGuard)
    @Post("confirm")
    async confirm(@Body() dto: ConfirmQrDto, @CurrentUser() user: { id: string }) {
        await this.qrAuthService.confirm(dto.pairingCode, user.id);
        return { success: true };
    }

    @Post("exchange")
    async exchange(@Body() dto: ExchangeQrDto) {
        return this.qrAuthService.exchange(dto.pairingCode);
    }

    @Get("status")
    @UseGuards(JwtAuthGuard)
    async status(@Query("pairingCode") pairingCode: string, @CurrentUser() user: { id: string }) {
        return this.qrAuthService.status(pairingCode, user.id);
    }
}