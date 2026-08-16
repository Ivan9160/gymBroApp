import { StyleSheet } from "react-native";
import { colors } from "../../../../style/theme";

export const swipeStyles = StyleSheet.create({
    swipeItem: {
        position: "relative",

        marginBottom: 8,

        overflow: "hidden",

        backgroundColor: colors.acctSore,

        borderRadius: 12,
    },

    swipeDeleteLabel: {
        position: "absolute",

        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        alignItems: "center",
        justifyContent: "flex-end",

        paddingHorizontal: 18,

        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },

    swipeMotion: {
        position: "relative",

        zIndex: 2,

        width: "100%",
    },

    swipeCard: {
        minHeight: 60,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 14,

        paddingVertical: 11,
        paddingHorizontal: 14,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    swipeCardActive: {
        opacity: 0.92,
    },

    swipeInfo: {
        flex: 1,
        minWidth: 0,
    },

    swipeTitle: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    swipeDetails: {
        marginTop: 3,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 16,
    },

    swipeBadge: {
        flexShrink: 0,

        paddingVertical: 4,
        paddingHorizontal: 10,

        backgroundColor: colors.acctAdminBg,

        borderRadius: 8,
    },

    swipeBadgeText: {
        color: colors.acctAdminText,
        fontSize: 12,
        fontWeight: "600",
    },
});
