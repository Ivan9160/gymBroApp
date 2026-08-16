import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const appShellStyles = StyleSheet.create({
    appShell: {
        flex: 1,

        minHeight: "100%",

        backgroundColor: colors.acctBg,
    },

    appHeader: {
        minHeight: 60,

        backgroundColor: "rgba(12, 12, 14, 0.94)",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,

        // backdrop-filter has no direct RN equivalent.
        // Use BlurView if blur is required.
    },

    appHeaderInner: {
        minHeight: 60,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 16,

        paddingHorizontal: 16,
    },

    appBrand: {
        flexDirection: "row",
        alignItems: "center",

        gap: 9,
    },

    appBrandText: {
        color: colors.acctText,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: -0.2,
    },

    appBrandMark: {
        width: 30,
        height: 30,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctAccent,

        borderRadius: 9,
    },

    appBrandMarkText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "700",
    },

    appHeaderNav: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,
    },

    appHeaderLink: {
        margin: 0,

        paddingVertical: 7,
        paddingHorizontal: 10,

        borderRadius: 9,
    },

    appHeaderLinkText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
    },

    appHeaderLinkPressed: {
        backgroundColor: colors.acctCard,
    },

    appHeaderLinkPressedText: {
        color: colors.acctText,
    },

    appHeaderLinkSecondary: {
        color: colors.acctTextMuted,
    },

    languageSwitcher: {
        flexDirection: "row",
        alignItems: "center",

        gap: 4,

        padding: 3,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 10,
    },

    languageBtn: {
        paddingVertical: 5,
        paddingHorizontal: 8,

        backgroundColor: "transparent",

        borderRadius: 7,
    },

    languageBtnText: {
        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",
    },

    languageBtnActive: {
        backgroundColor: colors.acctAccent,
    },

    languageBtnActiveText: {
        color: colors.white,
    },

    appMain: {
        flex: 1,
        minHeight: "100%",

        backgroundColor: colors.acctBg,
    },
});
