import { StyleSheet } from "react-native";
import { colors } from "../../../../style/theme";

export const detailsStyles = StyleSheet.create({
    detailsCard: {
        overflow: "hidden",

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        marginLeft: -10,
        marginRight: -10,
        borderRadius: 18,
    },

    detailsHero: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",

        gap: 1,

        padding: 18,

        backgroundColor: colors.acctCard,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    detailsHeroContent: {
        flex: 1,
        minWidth: 0,
    },

    detailsHeroTitle: {
        color: colors.acctText,
        fontSize: 22,
        fontWeight: "600",
    },

    detailsDate: {
        flexDirection: "row",
        alignItems: "center",

        gap: 7,

        marginTop: 2,
    },

    detailsDateText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    detailsDateIcon: {
        color: colors.acctAccent,
    },


        detailsStatLabel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        

        gap: 5,

        textAlign: "center",
    },

    detailsStatLabelText: {
        color: colors.acctText,
        fontSize: 10,
        fontWeight: "700",

        letterSpacing: 0.4,
        textTransform: "uppercase",
    },

    detailsStatIcon: {
        color: colors.acctAccent,
    },


    detailsStatus: {
        flexShrink: 0,

        paddingVertical: 6,
        paddingHorizontal: 9,

        backgroundColor: "rgba(99, 153, 34, 0.12)",

        borderWidth: 1,
        borderColor: "rgba(99, 153, 34, 0.25)",
        borderRadius: 8,
    },

    detailsStatusText: {
        color: colors.successText,
        fontSize: 13,
        fontWeight: "700",
    },

    detailsStats: {
        flexDirection: "row",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    detailsStatsTwo: {
        marginBottom: -18,
        flexDirection: "row",
    },

    detailsStat: {
        flex: 1,
        minWidth: 0,

        alignItems: "center",

        padding: 12,

        borderRightWidth: 1,
        borderRightColor: colors.acctBorder,
    },

    detailsStatLast: {
        borderRightWidth: 0,
    },


    detailsStatValue: {
        marginTop: 2,

        color: colors.acctText,
        fontSize: 16,
        fontWeight: "600",
    },

    detailsBody: {
        padding: 12,
    },

    detailsSectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 12,

        marginBottom: 12,
    },

    detailsSectionLabel: {
        marginBottom: 2,
    },

    detailsSectionCount: {
        color: colors.acctTextMuted,
        marginTop: 12,
        fontSize: 12,
    },

    detailsGroups: {
        gap: 8,
    },

    workoutGroup: {
        overflow: "hidden",

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 14,
    },

    workoutGroupSpaced: {
        marginTop: 12,
    },

    workoutGroupHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 12,

        paddingVertical: 13,
        paddingHorizontal: 14,

        backgroundColor: "rgba(255, 255, 255, 0.02)",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    workoutGroupTitle: {
        flex: 1,
        minWidth: 0,

        flexDirection: "row",
        alignItems: "center",

        gap: 9,
    },

    workoutGroupTitleIcon: {
        width: 24,
        height: 24,

        flexShrink: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "rgba(47, 111, 214, 0.13)",

        borderRadius: 7,
    },

    workoutGroupTitleIconText: {
        color: colors.blueText,
        fontSize: 11,
        fontWeight: "700",
    },

    workoutGroupTitleText: {
        flex: 1,
        minWidth: 0,

        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 18,
    },

    workoutGroupBadge: {
        flexShrink: 0,

        paddingVertical: 5,
        paddingHorizontal: 9,

        backgroundColor: "rgba(47, 111, 214, 0.08)",

        borderWidth: 1,
        borderColor: "rgba(47, 111, 214, 0.18)",
        borderRadius: 8,
    },

    workoutGroupBadgeText: {
        color: colors.blueText,
        fontSize: 11,
        fontWeight: "600",
    },

    workoutGroupBody: {
        paddingTop: 2,
        paddingHorizontal: 14,
        paddingBottom: 12,
    },

    workoutExercise: {
        paddingVertical: 12,

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    workoutExerciseLast: {
        paddingBottom: 4,

        borderBottomWidth: 0,
    },

    workoutExerciseTitleRow: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,

        marginBottom: 8,
    },

    workoutExerciseIndex: {
        width: 22,
        height: 22,

        flexShrink: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 6,
    },

    workoutExerciseIndexText: {
        color: colors.acctTextSecondary,
        fontSize: 10,
        fontWeight: "700",
    },

    workoutExerciseTitle: {
        flex: 1,
        minWidth: 0,

        color: colors.acctText,
        fontSize: 13,
        fontWeight: "600",
        lineHeight: 18,
    },

    workoutTable: {
        width: "100%",

        marginTop: 2,
    },

    workoutTableHeader: {
        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 7,
        paddingHorizontal: 8,

        backgroundColor: "transparent",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    workoutTableHeaderText: {
        color: colors.acctTextMuted,
        fontSize: 10,
        fontWeight: "700",

        letterSpacing: 0.45,
        textTransform: "uppercase",
    },

    workoutTableRow: {
        flexDirection: "row",
        alignItems: "center",

        minHeight: 40,

        paddingVertical: 9,
        paddingHorizontal: 8,

        backgroundColor: "transparent",

        borderBottomWidth: 1,
        borderBottomColor: colors.tableBorder,
    },

    workoutTableRowLast: {
        borderBottomWidth: 0,
    },

    workoutTableRowPressed: {
        backgroundColor: "rgba(255, 255, 255, 0.025)",
    },

    workoutTableCell: {
        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    workoutTableCellMuted: {
        color: colors.acctTextMuted,
    },

    workoutTableCellPrimary: {
        color: colors.acctText,
        fontWeight: "600",
    },

    workoutTableCellFirst: {
        width: "20%",

        color: colors.acctTextMuted,
        fontWeight: "700",
    },

    workoutTableCellSecond: {
        flex: 1,
        color: colors.acctText,
        fontWeight: "600",
    },

    workoutTableCellThird: {
        flex: 1,
        color: colors.acctText,
        fontWeight: "600",
    },

    workoutTableCellSubtext: {
        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "400",
    },
});