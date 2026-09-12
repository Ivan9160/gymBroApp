import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useTranslation } from "react-i18next";
import { storeAccessToken } from "../../hooks/useAnonymousAuth";

interface QrLoginScannerProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function QrLoginScanner({ visible, onClose, onSuccess }: QrLoginScannerProps) {
    const { t } = useTranslation();
    const [permission, requestPermission] = useCameraPermissions();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (isProcessing) {
            return;
        }

        setIsProcessing(true);

        try {
            const parsed = JSON.parse(data) as {
                type?: string;
                pairingCode?: string;
            };

            if (parsed.type !== "gymbro_qr_login" || !parsed.pairingCode) {
                throw new Error("Invalid GymBro QR code");
            }

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/request-exchange`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pairingCode: parsed.pairingCode,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("QR code expired or invalid");
            }

            let status: "scanned" | "confirmed" = "scanned";

            while (status !== "confirmed") {
                await new Promise((resolve) => setTimeout(resolve, 1500));

                const pollResponse = await fetch(
                    `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/request-exchange`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            pairingCode: parsed.pairingCode,
                        }),
                    }
                );

                if (!pollResponse.ok) {
                    throw new Error("QR login session expired");
                }

                const pollData: { status: "scanned" | "confirmed" } = await pollResponse.json();
                status = pollData.status;
            }

            const exchangeResponse = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/exchange`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pairingCode: parsed.pairingCode,
                    }),
                }
            );

            if (!exchangeResponse.ok) {
                throw new Error("Unable to exchange QR session");
            }

            const tokens: { accessToken: string; refreshToken: string } = await exchangeResponse.json();

            await storeAccessToken(tokens.accessToken);

            onClose();
            onSuccess();
        } catch (error) {
            console.error("QR login failed:", error);
            setIsProcessing(false);
        }
    };

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <View style={{ padding: 24, backgroundColor: "#18181D", borderRadius: 20 }}>
                        <Text style={{ color: "#FFF", marginBottom: 20 }}>
                            {t("qr_login.camera_permission_required")}
                        </Text>

                        <Pressable onPress={requestPermission}>
                            <Text style={{ color: "#FFF" }}>{t("qr_login.allow_camera")}</Text>
                        </Pressable>

                        <Pressable onPress={onClose} style={{ marginTop: 16 }}>
                            <Text style={{ color: "#A8A8B2" }}>{t("qr_login.cancel")}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: "#000" }}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                    onBarcodeScanned={isProcessing ? undefined : handleBarcodeScanned}
                />

                <View style={{ position: "absolute", top: 60, left: 20, right: 20, alignItems: "center" }}>
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>
                        {t("qr_login.scan_title")}
                    </Text>

                    {isProcessing && (
                        <ActivityIndicator color="#FFF" style={{ marginTop: 20 }} />
                    )}
                </View>

                <Pressable onPress={onClose} style={{ position: "absolute", bottom: 50, alignSelf: "center" }}>
                    <Text style={{ color: "#FFF", fontSize: 16 }}>{t("qr_login.cancel")}</Text>
                </Pressable>
            </View>
        </Modal>
    );
}