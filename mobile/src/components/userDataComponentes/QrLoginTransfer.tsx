import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { getStoredAccessToken } from "../../hooks/useAnonymousAuth";
import { styles } from "../../style";

interface QrLoginTransferProps {
    onClose?: () => void;
}

type QrStatus = "pending" | "scanned" | "confirmed";

export function QrLoginTransfer({ onClose }: QrLoginTransferProps) {
    const [visible, setVisible] = useState(false);
    const [pairingCode, setPairingCode] = useState<string | null>(null);
    const [status, setStatus] = useState<QrStatus>("pending");
    const [expiresAt, setExpiresAt] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const close = () => {
        setVisible(false);
        setPairingCode(null);
        setStatus("pending");
        setExpiresAt(null);
        onClose?.();
    };

    const generateQr = async () => {
        setIsGenerating(true);

        try {
            const token = await getStoredAccessToken();

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/generate`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("QR generate failed:", {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText,
                });
                throw new Error("Unable to generate QR code");
            }

            const data: { pairingCode: string; expiresAt: number } = await response.json();

            setPairingCode(data.pairingCode);
            setExpiresAt(data.expiresAt);
            setStatus("pending");
            setVisible(true);
            setExpiresAt(data.expiresAt);
            setSecondsLeft(Math.max(0, Math.ceil((data.expiresAt - Date.now()) / 1000)));
        } catch (error) {
            console.error("Unable to generate QR login:", error);
        } finally {
            setIsGenerating(false);
        }
    };
    const [secondsLeft, setSecondsLeft] = useState(0);



    useEffect(() => {
        if (!visible || !pairingCode || status === "confirmed") {
            return;
        }

        const interval = setInterval(async () => {
            try {
                const token = await getStoredAccessToken();

                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/status?pairingCode=${encodeURIComponent(pairingCode)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data: { status: QrStatus; expiresAt: number } = await response.json();
                setStatus(data.status);

            } catch (error) {
                console.error("Unable to check QR status:", error);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [visible, pairingCode, status]);


    useEffect(() => {
        if (!visible || !expiresAt) {
            return;
        }

        const interval = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.ceil((expiresAt - Date.now()) / 1000)
            );

            setSecondsLeft(remaining);

            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [visible, expiresAt]);
    


    const confirmLogin = async () => {
        if (!pairingCode) {
            return;
        }

        setIsConfirming(true);

        try {
            const token = await getStoredAccessToken();

            const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/qr/confirm`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ pairingCode }),
                }
            );

            if (!response.ok) {
                throw new Error("Unable to confirm QR login");
            }

            setStatus("confirmed");
        } catch (error) {
            console.error("Unable to confirm QR login:", error);
        } finally {
            setIsConfirming(false);
        }
    };

    const qrValue = pairingCode
        ? JSON.stringify({
              type: "gymbro_qr_login",
              pairingCode,
          })
        : "";

    return (
        <>
            <Pressable onPress={generateQr} disabled={isGenerating} style={styles.qrButton}>
                {isGenerating ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.qrButtonText}>Log in on another device</Text>
                )}
            </Pressable>

            <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <View style={{ padding: 24, borderRadius: 20, backgroundColor: "#18181D", alignItems: "center" }}>
                        <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
                            Log in on another device
                        </Text>

                        {pairingCode && <QRCode value={qrValue} size={240} backgroundColor="#FFFFFF" />}

                        <Text style={{ color: "#A8A8B2", textAlign: "center", marginTop: 20 }}>
                            {status === "pending" && "Scan this QR code with your new device."}
                            {status === "scanned" && "QR code scanned. Confirm login on this device."}
                            {status === "confirmed" && "Login confirmed. The other device can finish signing in."}
                        </Text>

                        {status === "scanned" && (
                            <Pressable onPress={confirmLogin} disabled={isConfirming} style={{ marginTop: 20 }}>
                                {isConfirming ? <ActivityIndicator /> : <Text style={{ color: "#FFF" }}>Confirm login</Text>}
                            </Pressable>
                        )}

                        {expiresAt && (
                            <Text style={{ color: "#77777F", marginTop: 12 }}>
                                Expires in {secondsLeft}s
                            </Text>
                        )}

                        <Pressable onPress={close} style={{ marginTop: 20 }}>
                            <Text style={{ color: "#A8A8B2" }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}