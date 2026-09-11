import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredAccessToken } from "../hooks/useAnonymousAuth";

export interface GenerateQrResponse {
    pairingCode: string;
    expiresAt: number;
}

export type QrStatus = "pending" | "scanned" | "confirmed";

export interface StatusResponse {
    status: QrStatus;
}

export interface ExchangeResponse {
    accessToken: string;
    refreshToken: string;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export const qrAuthApi = createApi({
    reducerPath: "qrAuthApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: async (headers) => {
            const token = await getStoredAccessToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        generateQr: builder.mutation<GenerateQrResponse, void>({
            query: () => ({
                url: "/auth/qr/generate",
                method: "POST",
            }),
        }),
        requestExchange: builder.mutation<StatusResponse, { pairingCode: string }>({
            query: (body) => ({
                url: "/auth/qr/request-exchange",
                method: "POST",
                body,
            }),
        }),
        confirmQr: builder.mutation<{ success: boolean }, { pairingCode: string }>({
            query: (body) => ({
                url: "/auth/qr/confirm",
                method: "POST",
                body,
            }),
        }),
        exchangeQr: builder.mutation<ExchangeResponse, { pairingCode: string }>({
            query: (body) => ({
                url: "/auth/qr/exchange",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGenerateQrMutation,
    useRequestExchangeMutation,
    useConfirmQrMutation,
    useExchangeQrMutation,
} = qrAuthApi;