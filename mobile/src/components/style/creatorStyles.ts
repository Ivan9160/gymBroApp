import { StyleSheet } from "react-native";
import { colors } from "../../style/theme";

export const creatorStyles = StyleSheet.create({
    creatorCard: {
        padding: 20,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    creatorForm: {
        gap: 18,
    },

    formSelect: {
        minHeight: 54,

        justifyContent: "center",

        paddingHorizontal: 14,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    formSelectText: {
        color: colors.acctText,
        fontSize: 14,
    },

    formHelp: {
        marginTop: 6,

        color: colors.acctTextMuted,
        fontSize: 11,
        lineHeight: 16,
    },

    formHelpWarning: {
        color: colors.acctAdminText,
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

    actionBtn: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        minHeight: 48,

        margin: 0,

        textAlign: "center",
    },

    actionBtnDisabled: {
        opacity: 0.55,
    },

    creatorTip: {
        marginTop: 14,

        paddingVertical: 16,
        paddingHorizontal: 18,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    creatorTipSectionLabel: {
        marginBottom: 5,
    },

    creatorTipText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 19,
    },

    alert: {
        position: "relative",

        flexDirection: "row",
        alignItems: "flex-start",

        gap: 10,

        marginBottom: 14,

        paddingTop: 13,
        paddingRight: 44,
        paddingBottom: 13,
        paddingLeft: 14,

        borderRadius: 14,
    },

    alertContent: {
        flex: 1,

        gap: 3,
    },

    alertSuccess: {
        backgroundColor: "rgba(99, 153, 34, 0.11)",

        borderWidth: 1,
        borderColor: "rgba(99, 153, 34, 0.28)",
    },

    alertSuccessTitle: {
        color: colors.successText,
        fontSize: 13,
        fontWeight: "700",
    },

    alertError: {
        backgroundColor: "rgba(226, 75, 74, 0.1)",

        borderWidth: 1,
        borderColor: "rgba(226, 75, 74, 0.25)",
    },

    alertErrorTitle: {
        color: colors.errorText,
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

    alertClosePressed: {
        backgroundColor: "rgba(255, 255, 255, 0.06)",
    },

    alertCloseText: {
        color: colors.acctTextMuted,
        fontSize: 20,
        lineHeight: 22,
    },
});
