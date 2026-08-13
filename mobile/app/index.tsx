import { useEffect } from "react";
import {
    ActivityIndicator,
    View,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { router } from "expo-router";

import HomePage from "../src/components/home";
import { useProfileToken } from "../src/hooks/useProfileToken";
import {
    useGetUserSummaryQuery,
} from "../src/api/userApi";

export default function Index() {
    const {
        user: authUser,
        isLoading: authLoading,
    } = useAuth0();

    const { tokenReady } = useProfileToken();

    const {
        data: userSummary,
        isLoading: summaryLoading,
        isFetching: summaryFetching,
        isSuccess: summarySuccess,
        isError: summaryIsError,
        error: summaryError,
    } = useGetUserSummaryQuery(undefined, {
        skip:
            !authUser ||
            !tokenReady,
    });

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!authUser) {
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
            return;
        }

        if (summaryIsError) {
            router.replace("/createProfile");
        }
    }, [
        authLoading,
        authUser,
        tokenReady,
        summaryLoading,
        summaryFetching,
        summarySuccess,
        summaryIsError,
        userSummary,
        summaryError,
    ]);

    if (
        authLoading ||
        (
            authUser &&
            (
                !tokenReady ||
                summaryLoading ||
                summaryFetching
            )
        )
    ) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return <HomePage />;
}