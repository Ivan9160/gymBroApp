import { StyleSheet } from "react-native";
import { colors } from "../../../style/theme";

export const accountPageStyles = StyleSheet.create({
    accountPage: {
        flex: 1,
        minHeight: "100%",
        backgroundColor: colors.acctBg,
        color: colors.acctText,
    },

    profileRowLink: {
        width: "100%",
    },

    profileRow: {
        flexDirection: "row",
        alignItems: "center",

        gap: 12,

        paddingVertical: 12,
        paddingHorizontal: 14,

        marginBottom: 14,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    profileRowPressed: {
        backgroundColor: colors.acctCardAlt,
    },

    avatar: {
        width: 42,
        height: 42,

        flexShrink: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.avatarBackground,

        borderRadius: 21,
    },

    avatarText: {
        color: colors.blueLight,
        fontSize: 15,
        fontWeight: "600",
    },

    profileText: {
        flex: 1,
        minWidth: 0,
    },

    greeting: {
        margin: 0,

        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    subtitle: {
        marginTop: 2,

        color: colors.acctText,
        fontSize: 14,
        fontWeight: "500",
    },

    streakBadge: {
        flexShrink: 0,

        flexDirection: "row",
        alignItems: "center",

        gap: 4,

        paddingVertical: 5,
        paddingHorizontal: 10,

        backgroundColor: colors.acctAdminBg,

        borderRadius: 8,
    },

    streakBadgeText: {
        color: colors.acctAdminText,
        fontSize: 12,
        fontWeight: "600",
    },

    chevron: {
        flexShrink: 0,

        color: colors.acctTextMuted,
        fontSize: 18,
    },

    adminBtnLink: {
        width: "100%",
        marginBottom: 14,
    },

    adminBtn: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 8,

        padding: 10,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctAdminBorder,
        borderRadius: 12,
    },

    adminBtnPressed: {
        backgroundColor: colors.acctAdminBg,
    },

    adminBtnText: {
        color: colors.acctAdminText,
        fontSize: 13,
        fontWeight: "600",
    },

    adminTag: {
        paddingVertical: 2,
        paddingHorizontal: 6,

        backgroundColor: colors.acctAdminBg,

        borderRadius: 6,

        color: colors.acctAdminText,
        fontSize: 10,
    },

    primaryCta: {
        width: "100%",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 8,

        marginBottom: 22,

        padding: 16,

        backgroundColor: colors.acctAccent,

        borderRadius: 14,
    },

    primaryCtaPressed: {
        backgroundColor: colors.acctAccentHover,
    },

    primaryCtaText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },

    primaryCtaDisabled: {
        opacity: 0.55,
    },

    activeWorkoutWrapper: {
        marginBottom: 22,
    },


    card: {
        paddingVertical: 16,
        paddingHorizontal: 18,

        marginBottom: 22,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    statRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 9,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    statRowLast: {
        borderBottomWidth: 0,
    },

    statLabel: {
        color: colors.acctTextSecondary,
        fontSize: 14,
    },

    statValue: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    goalValue: {
        color: colors.goalGreen,
    },

    heatmapLegend: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",

        gap: 16,

        marginTop: 10,
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center",

        gap: 6,
    },

    legendItemText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    legendDot: {
        width: 8,
        height: 8,

        borderRadius: 4,
    },

    hiddenGroups: {
        marginTop: 14,
        paddingTop: 10,

        borderTopWidth: 1,
        borderTopColor: colors.acctBorder,
    },

    hiddenGroupRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: 4,
    },

    hiddenGroupRowText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    progressItem: {
        marginBottom: 12,
    },

    progressItemLast: {
        marginBottom: 0,
    },

    progressTop: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 5,
    },

    progressTopLabel: {
        color: colors.acctText,
        fontSize: 13,
    },

    progressTopValue: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    progressLevel: {
        color: colors.acctAccent,
        fontSize: 13,
        fontWeight: "600",
        textTransform: "capitalize",
    },

    progressTrack: {
        height: 5,

        overflow: "hidden",

        backgroundColor: "rgba(255, 255, 255, 0.08)",

        borderRadius: 3,
    },

    progressFill: {
        height: "100%",

        backgroundColor: colors.acctAccent,

        borderRadius: 3,
    },

    progressSub: {
        marginTop: 5,

        color: colors.acctTextMuted,
        fontSize: 11,
    },

    historyRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    historyTitle: {
        margin: 0,

        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    historySubtitle: {
        marginTop: 2,

        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    ghostBtnLink: {
        width: "100%",
        marginTop: 10,
        marginBottom: 30,
    },

    ghostBtnLinkAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        marginBottom: 10,
    },

    ghostBtn: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center",

        padding: 11,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    ghostBtnPressed: {
        backgroundColor: colors.acctCard,
    },

    ghostBtnText: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "500",
    },

    logoutWrapper: {
        marginTop: 4,
    },

    mockNote: {
        marginTop: 10,

        color: colors.acctTextMuted,
        fontSize: 11,
        textAlign: "center",
    },

    bodymapStatus: {
        minHeight: 16,

        marginBottom: 8,

        color: colors.acctTextSecondary,
        fontSize: 12,
        textAlign: "center",
    },

    bodymapStatusStrong: {
        color: colors.acctText,
        textTransform: "capitalize",
    },

    bodymap: {
        flexDirection: "row",
        justifyContent: "center",

        gap: 14,
    },

    bodymapFigure: {
        alignItems: "center",
    },

    bodymapCaption: {
        marginTop: 4,

        color: colors.acctTextMuted,
        fontSize: 11,
    },

    bodyBase: {
        backgroundColor: colors.acctSkin,

        borderColor: colors.acctSkinStroke,
    },

    muscleShape: {
        // RN does not support CSS cursor/filter.
        // Use Pressable + opacity/color changes in component.
    },

    muscleShapePressed: {
        opacity: 0.85,
    },
});
