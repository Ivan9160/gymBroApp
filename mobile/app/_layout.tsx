import "intl-pluralrules";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Stack, router, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store } from "../src/store/store";
import "../src/localization/i18n";
import { getStoredAccessToken } from "../src/hooks/useAnonymousAuth";

console.log(new Intl.PluralRules("uk").resolvedOptions().pluralCategories);

function AuthNavigation() {
    const segments = useSegments();

    useEffect(() => {
        let cancelled = false;

        const checkAuth = async () => {
            const token = await getStoredAccessToken();

            if (cancelled) {
                return;
            }

            const hasToken = Boolean(token);
            const currentRoute = segments[0];

            if (!hasToken) {
                if (currentRoute !== "account") {
                    return;
                }

                router.replace("/");
                return;
            }

            
        };

        checkAuth();

        return () => {
            cancelled = true;
        };
    }, [segments]);

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
                <AuthNavigation />
            </Provider>
        </SafeAreaProvider>
    );
}