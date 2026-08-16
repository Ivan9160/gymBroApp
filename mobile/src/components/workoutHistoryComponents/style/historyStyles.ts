import { StyleSheet } from "react-native";
import { colors } from "../../../style/theme";

export const historyStyles = StyleSheet.create({
    historyHeading: {
        marginBottom: 24,
    },

    historyList: {
        gap: 12,
    },

    historyCard: {
        overflow: "hidden",

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    historyCardPressed: {
        backgroundColor: colors.acctCardAlt,
        borderColor: "rgba(255, 255, 255, 0.12)",
    },

    historyCardHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",

        gap: 14,

        paddingVertical: 16,
        paddingHorizontal: 18,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    historyCardHeaderContent: {
        flex: 1,
        minWidth: 0,
    },

    historyCardEyebrow: {
        marginBottom: 4,

        color: colors.acctFresh,
        fontSize: 10,
        fontWeight: "700",

        letterSpacing: 0.5,
        textTransform: "uppercase",
    },

    historyCardDate: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",

        gap: 7,

        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    historyBadge: {
        flexShrink: 0,

        paddingVertical: 5,
        paddingHorizontal: 9,

        backgroundColor: "rgba(47, 111, 214, 0.12)",

        borderWidth: 1,
        borderColor: "rgba(47, 111, 214, 0.24)",
        borderRadius: 8,
    },

    historyBadgeText: {
        color: colors.blueText,
        fontSize: 11,
        fontWeight: "700",
    },

    historySetList: {
        paddingVertical: 8,
        paddingHorizontal: 18,
    },

    historySetRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 16,

        paddingVertical: 12,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    historySetRowLast: {
        borderBottomWidth: 0,
    },

    historySetMain: {
        flex: 1,

        flexDirection: "row",
        alignItems: "center",

        gap: 10,

        minWidth: 0,
    },

    historySetIndex: {
        width: 25,
        height: 25,

        flexShrink: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctCardAlt,

        borderRadius: 8,
    },

    historySetIndexText: {
        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",
    },

    historySetMainContent: {
        flex: 1,
        minWidth: 0,
    },

    historySetMainTitle: {
        color: colors.acctText,
        fontSize: 13,
        fontWeight: "600",
    },

    historySetMainSubtitle: {
        marginTop: 2,

        color: colors.acctTextMuted,
        fontSize: 11,
    },

    historySetValue: {
        flexShrink: 0,

        color: colors.acctText,
        fontSize: 12,
        fontWeight: "600",

        textAlign: "right",
    },

    historyEmptyInline: {
        paddingVertical: 16,

        color: colors.acctTextMuted,
        fontSize: 12,

        textAlign: "center",
    },

    historyMore: {
        paddingHorizontal: 18,
        paddingBottom: 12,

        color: colors.acctTextMuted,
        fontSize: 11,

        textAlign: "center",
    },

    historyCardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 14,

        paddingVertical: 13,
        paddingHorizontal: 18,

        borderTopWidth: 1,
        borderTopColor: colors.acctBorder,
    },

    historyDuration: {
        gap: 2,
    },

    historyDurationLabel: {
        color: colors.acctTextMuted,
        fontSize: 10,

        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    historyDurationValue: {
        color: colors.acctText,
        fontSize: 13,
        fontWeight: "600",
    },

    historyReviewBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 7,

        margin: 0,

        paddingVertical: 9,
        paddingHorizontal: 12,
    },

    historyEmpty: {
        width: "100%",
        maxWidth: 520,

        alignSelf: "center",

        marginTop: 18,

        paddingVertical: 34,
        paddingHorizontal: 24,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 18,

        alignItems: "center",
    },

    historyEmptyIcon: {
        fontSize: 28,
        lineHeight: 30,
    },

    historyEmptyTitle: {
        marginTop: 14,
        marginBottom: 7,

        color: colors.acctText,
        fontSize: 19,
        fontWeight: "600",
    },

    historyEmptyText: {
        maxWidth: 380,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 20,

        textAlign: "center",
    },

    historyEmptyBtn: {
        width: "100%",
        maxWidth: 290,

        alignSelf: "center",

        marginTop: 20,
    },
});
