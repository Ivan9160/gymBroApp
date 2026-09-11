import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { QrAuthService } from "./qr-auth.service";
import { QrAuthController } from "./qr-auth.controller";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [QrAuthController],
    providers: [QrAuthService],
})
export class QrAuthModule {}