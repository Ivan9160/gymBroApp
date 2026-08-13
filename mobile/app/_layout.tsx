import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { Stack, router, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "../src/store/store";
import "../src/localization/i18n";

const AUTH0_DOMAIN =
    process.env.EXPO_PUBLIC_AUTH0_DOMAIN || "";

const AUTH0_CLIENT_ID =
    process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID || "";

function AuthNavigation() {
    const { user, isLoading } = useAuth0();
    const segments = useSegments();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const inLogin = segments[0] === "login";

        if (user && inLogin) {
            router.replace("/account");
        }

        if (!user && !inLogin) {
            router.replace("/");
        }
    }, [user, isLoading, segments]);

    if (isLoading) {
        return null;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: "#121212",
                },
            }}
        />
    );
}


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <Auth0Provider
                    domain={AUTH0_DOMAIN}
                    clientId={AUTH0_CLIENT_ID}
                >
                    <AuthNavigation />
                </Auth0Provider>
            </Provider>
        </SafeAreaProvider>
    );
}