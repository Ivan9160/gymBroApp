import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const loadingStyles = StyleSheet.create({
    loadingPage: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        padding: 24,

        backgroundColor: colors.acctBg,
    },

    loadingCard: {
        flexDirection: "row",
        alignItems: "center",

        gap: 10,

        paddingVertical: 14,
        paddingHorizontal: 16,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 14,
    },

    loadingText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    loadingSpinner: {
        width: 15,
        height: 15,
    },
});
