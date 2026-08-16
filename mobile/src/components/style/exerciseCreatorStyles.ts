import { StyleSheet } from "react-native";
import { colors } from "../../style/theme";

export const exerciseCreatorStyles = StyleSheet.create({
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

    backLink: {
        flexDirection: "row",
        alignItems: "center",

        gap: 5,

        marginBottom: 10,
    },

    backLinkArrow: {
        color: colors.acctTextSecondary,
        fontSize: 18,
        lineHeight: 20,
    },

    backLinkText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    pageHeading: {
        marginBottom: 12,
    },

    pageEyebrow: {
        marginBottom: 0,

        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",

        letterSpacing: 0.7,
        textTransform: "uppercase",
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 22,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 640,

        marginTop: 2,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 21,
    },

    alertSuccess: {
        position: "relative",

        flexDirection: "row",
        alignItems: "flex-start",

        marginBottom: 14,

        paddingTop: 13,
        paddingRight: 44,
        paddingBottom: 13,
        paddingLeft: 14,

        backgroundColor: "rgba(99, 153, 34, 0.11)",

        borderWidth: 1,
        borderColor: "rgba(99, 153, 34, 0.28)",
        borderRadius: 14,
    },

    alertError: {
        position: "relative",

        flexDirection: "row",
        alignItems: "flex-start",

        marginBottom: 14,

        paddingTop: 13,
        paddingRight: 44,
        paddingBottom: 13,
        paddingLeft: 14,

        backgroundColor: "rgba(226, 75, 74, 0.1)",

        borderWidth: 1,
        borderColor: "rgba(226, 75, 74, 0.25)",
        borderRadius: 14,
    },

    alertContent: {
        flex: 1,

        gap: 3,
    },

    alertTitle: {
        color: colors.acctText,
        fontSize: 13,
        fontWeight: "700",
    },

    alertText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 17,
    },

    alertClose: {
        position: "absolute",

        top: 8,
        right: 9,

        width: 28,
        height: 28,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 8,
    },

    alertCloseText: {
        color: colors.acctTextMuted,
        fontSize: 20,
        lineHeight: 22,
    },

    card: {
        width: "100%",

        padding: 20,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    form: {
        gap: 18,
    },

    formField: {
        width: "100%",
    },

    formLabel: {
        marginBottom: 8,

        color: colors.acctTextSecondary,
        fontSize: 12,
        fontWeight: "600",
    },

    formControl: {
        width: "100%",
        minHeight: 54,

        paddingHorizontal: 14,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,

        color: colors.acctText,

        fontSize: 14,
    },

    formControlFocused: {
        borderColor: "rgba(47, 111, 214, 0.75)",
    },

    formHelp: {
        marginTop: 6,

        color: colors.acctTextMuted,
        fontSize: 11,
        lineHeight: 16,
    },

    formHelpWarning: {
        marginTop: 6,

        color: colors.acctAdminText,
        fontSize: 11,
        lineHeight: 16,
    },

    select: {
        width: "100%",
        minHeight: 54,

        justifyContent: "center",

        paddingHorizontal: 14,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    selectText: {
        color: colors.acctText,
        fontSize: 14,
        lineHeight: 20,
    },

    selectOptions: {
        gap: 8,

        marginTop: 8,
    },

    selectOption: {
        width: "100%",

        paddingVertical: 11,
        paddingHorizontal: 14,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    selectOptionActive: {
        backgroundColor: colors.acctAccent,
        borderColor: colors.acctAccent,
    },

    selectOptionText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
    },

    selectOptionTextActive: {
        color: colors.white,
    },

    checkboxRow: {
        flexDirection: "row",
        alignItems: "flex-start",

        gap: 10,

        padding: 12,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    checkboxText: {
        flex: 1,

        gap: 3,
    },

    checkboxTitle: {
        color: colors.acctText,
        fontSize: 13,
        fontWeight: "600",
    },

    checkboxHelp: {
        color: colors.acctTextSecondary,
        fontSize: 11,
        lineHeight: 16,
    },

    formActions: {
        flexDirection: "row",

        gap: 10,

        paddingTop: 2,
    },

    ghostButton: {
        flex: 1,

        minHeight: 48,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 16,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    ghostButtonText: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "500",
    },

    primaryCta: {
        flex: 1,

        minHeight: 48,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 16,

        backgroundColor: colors.acctAccent,

        borderRadius: 14,
    },

    primaryCtaDisabled: {
        opacity: 0.55,
    },

    primaryCtaText: {
        color: colors.acctText,
        fontSize: 16,
        fontWeight: "600",
    },

    tipCard: {
        marginTop: 14,

        paddingVertical: 16,
        paddingHorizontal: 18,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    tipText: {
        margin: 0,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 19,
    },

    sectionLabel: {
        marginBottom: 5,
        marginTop: 15,
        marginLeft: 3,

        color: colors.acctTextMuted,
        fontSize: 12,

        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
});
