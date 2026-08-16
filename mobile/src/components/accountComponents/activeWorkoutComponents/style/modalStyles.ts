import { StyleSheet } from "react-native";
import { colors } from "../../../../style/theme";

export const modalStyles = StyleSheet.create({
    modal: {
        backgroundColor: "transparent",
    },

    modalContent: {
        overflow: "hidden",

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.45,
        shadowRadius: 60,

        elevation: 20,
    },

    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 16,
        paddingHorizontal: 18,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    modalTitle: {
        color: colors.acctText,
        fontSize: 16,
        fontWeight: "600",
    },

    modalClose: {
        width: 32,
        height: 32,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 8,
    },

    modalClosePressed: {
        backgroundColor: colors.acctCardAlt,
    },

    modalCloseText: {
        color: colors.acctTextMuted,
        fontSize: 24,
        lineHeight: 26,
    },

    modalBody: {
        padding: 18,
    },

    modalText: {
        color: colors.acctTextSecondary,
        fontSize: 14,
        lineHeight: 22,
    },

    modalFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

        gap: 8,

        paddingTop: 12,
        paddingHorizontal: 18,
        paddingBottom: 18,

        borderTopWidth: 1,
        borderTopColor: colors.acctBorder,
    },

    modalAction: {
        minWidth: 96,

        alignItems: "center",
        justifyContent: "center",

        margin: 0,

        paddingVertical: 10,
        paddingHorizontal: 16,

        borderRadius: 12,
    },

    modalCancel: {
        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
    },

    modalCancelPressed: {
        backgroundColor: colors.acctCardAlt,
        borderColor: "rgba(255, 255, 255, 0.12)",
    },

    modalCancelText: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    modalConfirm: {
        backgroundColor: colors.acctFresh,

        borderWidth: 1,
        borderColor: colors.acctFresh,
    },

    modalConfirmPressed: {
        backgroundColor: "#56881e",
        borderColor: "#56881e",
    },

    modalConfirmText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "600",
    },
});
