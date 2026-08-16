import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const contentStyles = StyleSheet.create({
    contentPage: {
        flex: 1,

        backgroundColor: colors.acctBg,
    },

    contentContainer: {
        width: "100%",
        maxWidth: 760,

        alignSelf: "center",

        paddingTop: 32,
        paddingHorizontal: 16,
        paddingBottom: 64,
    },

    pageHeading: {
        marginBottom: 22,
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 26,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 640,

        marginTop: 8,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 21,
    },

    historyHeading: {
        marginBottom: 24,
    },
});
