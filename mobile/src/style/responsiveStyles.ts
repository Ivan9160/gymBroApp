import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const responsiveStyles = StyleSheet.create({
    /*
     * <= 760
     */

    at760Container: {
        width: "100%",
    },

    at760GuestFeatureGrid: {
        flexDirection: "column",
    },

    at760GuestSteps: {
        flexDirection: "column",
    },

    at760FormGrid: {
        flexDirection: "column",
    },

    at760SettingsRow: {
        alignItems: "flex-start",

        flexDirection: "column",
    },

    at760LanguageOptions: {
        width: "100%",

        justifyContent: "center",
    },

    at760LogoutBtn: {
        width: "100%",
    },

    at760DetailsStats: {
        flexDirection: "column",
    },

    at760DetailsStat: {
        width: "100%",

        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    at760DetailsStatLast: {
        borderBottomWidth: 0,
    },

    at760HistoryCardFooter: {
        alignItems: "stretch",

        flexDirection: "column",
    },

    at760FormActions: {
        alignItems: "stretch",

        flexDirection: "column",
    },

    at760HistoryReviewBtn: {
        width: "100%",
    },

    at760ActionBtn: {
        width: "100%",
    },

    /*
     * <= 520
     */

    at520HeaderInner: {
        minHeight: 56,
    },

    at520HeaderLink: {
        display: "none",
    },

    at520Container: {
        width: "100%",

        paddingHorizontal: 12,
    },

    at520GuestHeroTitle: {
        fontSize: 36,
        lineHeight: 39,
    },

    at520GuestHeroSubtitle: {
        fontSize: 14,
        lineHeight: 22,
    },

    at520Card: {
        padding: 16,

        borderRadius: 14,
    },

    at520PageTitle: {
        fontSize: 23,
    },

    at520ContentContainer: {
        width: "100%",

        paddingTop: 24,
        paddingHorizontal: 12,
    },

    at520HistoryCardHeader: {
        flexDirection: "column",
        alignItems: "stretch",
    },

    at520DetailsHero: {
        flexDirection: "column",
        alignItems: "stretch",
    },

    at520HistoryBadge: {
        alignSelf: "flex-start",
    },

    at520DetailsStatus: {
        alignSelf: "flex-start",
    },

    at520HistorySetRow: {
        alignItems: "flex-start",

        flexDirection: "column",

        gap: 7,
    },

    at520HistorySetValue: {
        paddingLeft: 35,

        textAlign: "left",
    },

    at520DetailsHeroTitle: {
        fontSize: 20,
    },

    at520DetailsBody: {
        padding: 16,
    },

    at520CreatorCard: {
        padding: 16,
    },

    /*
     * <= 480
     */

    at480ModalFooter: {
        flexDirection: "column-reverse",
    },

    at480ModalAction: {
        width: "100%",
    },

    at480SwipeCard: {
        gap: 10,

        paddingHorizontal: 12,
    },

    at480SwipeBadge: {
        paddingHorizontal: 8,
    },

    at480WorkoutGroupHeader: {
        alignItems: "flex-start",

        flexDirection: "column",

        gap: 8,
    },

    at480WorkoutGroupBadge: {
        alignSelf: "flex-start",
    },

    at480WorkoutGroupBody: {
        paddingHorizontal: 10,
    },

    at480WorkoutExerciseTitle: {
        /*
         * CSS white-space: normal
         */
    },

    at480WorkoutTable: {
        fontSize: 11,
    },

    at480WorkoutTableHeader: {
        paddingHorizontal: 6,
    },

    at480WorkoutTableCell: {
        paddingHorizontal: 6,
    },

    /*
     * <= 360
     */

    at360DetailsStat: {
        paddingHorizontal: 8,
    },

    at360DetailsStatLabel: {
        fontSize: 9,
    },

    at360DetailsStatValue: {
        fontSize: 14,
    },
});
