import { IsString, IsNotEmpty } from "class-validator";

export class ExchangeQrDto {
    @IsString()
    @IsNotEmpty()
    pairingCode!: string;
}

export class ConfirmQrDto {
    @IsString()
    @IsNotEmpty()
    pairingCode!: string;
}