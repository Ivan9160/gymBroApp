import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "accessToken";

export function useAnonymousAuth() {
    const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const checkStoredToken = async () => {
            try {
                const token = await SecureStore.getItemAsync(TOKEN_KEY);

                if (isMounted) {
                    setTokenReady(Boolean(token));
                }
            } catch (error) {
                console.error(
                    "Unable to read stored access token:",
                    error
                );

                if (isMounted) {
                    setTokenReady(false);
                }
            }
        };

        checkStoredToken();

        return () => {
            isMounted = false;
        };
    }, []);

    return { tokenReady };
}


export async function getStoredAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function storeAccessToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeAccessToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}