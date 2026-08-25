import { useEffect } from "react";

import {
    ActivityIndicator,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import HomePage from "../src/components/home";
import { useAnonymousAuth } from "../src/hooks/useAnonymousAuth";
import {
    useGetUserSummaryQuery,
} from "../src/api/userApi";

export default function Index() {
    const { tokenReady } = useAnonymousAuth();

    const { fromCreateProfile } = useLocalSearchParams<{
        fromCreateProfile?: string;
    }>();

    const {
        data: userSummary,
        isLoading: summaryLoading,
        isFetching: summaryFetching,
        isSuccess: summarySuccess,
    } = useGetUserSummaryQuery(undefined, {
        skip: !tokenReady,
    });

    const shouldReturnToHome =
        fromCreateProfile === "true";

    useEffect(() => {
        if (shouldReturnToHome) {
            return;
        }

        if (!tokenReady) {
            return;
        }

        if (
            summaryLoading ||
            summaryFetching
        ) {
            return;
        }

        if (
            summarySuccess &&
            userSummary
        ) {
            router.replace("/account");
        }
    }, [
        shouldReturnToHome,
        tokenReady,
        summaryLoading,
        summaryFetching,
        summarySuccess,
        userSummary,
    ]);

    if (shouldReturnToHome) {
        return <HomePage />;
    }

    if (
        tokenReady &&
        (
            summaryLoading ||
            summaryFetching
        )
    ) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return <HomePage />;
}