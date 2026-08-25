import { StyleSheet } from "react-native";
import { colors } from "../../style/theme";

export const guestStyles = StyleSheet.create({
    guestPage: {
        flex: 1,

        backgroundColor: colors.acctBg,
    },

    guestContainer: {
        width: "100%",

        alignSelf: "center",

        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    guestHero: {
        width: "100%",
        maxWidth: 680,

        alignSelf: "center",

        alignItems: "center",

        textAlign: "center",
    },

    guestHeroBadge: {
        flexDirection: "row",
        alignItems: "center",

        gap: 7,

        paddingVertical: 8,
        paddingHorizontal: 11,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 999,
        marginBottom: -8,
    },

    guestHeroBadgeText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
        fontWeight: "600",
    },

    guestHeroTitle: {
        marginTop: 24,
        marginBottom: 5,

        color: colors.acctText,

        fontSize: 42,
        fontWeight: "700",
        lineHeight: 45,

        letterSpacing: -1.5,

        textAlign: "center",
    },

    guestHeroSubtitle: {
        maxWidth: 610,

        color: colors.acctTextSecondary,

        fontSize: 16,
        lineHeight: 26,

        textAlign: "center",
    },

    guestHeroCta: {
        alignItems: "center",
        justifyContent: "center",

        minWidth: 220,

        marginTop: 20,

        paddingVertical: 10,
        paddingHorizontal: 34,

        backgroundColor: colors.acctAccent,

        borderRadius: 16,

        shadowColor: colors.acctAccent,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.35,
        shadowRadius: 28,

        elevation: 6,
    },

    guestHeroCtaText: {
        color: colors.white,

        fontSize: 23,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    guestFeatureGrid: {
        width: "100%",

        flexDirection: "row",

        gap: 14,

        marginTop: 28,
    },

    guestFeatureCard: {
        flex: 1,

        padding: 18,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    guestFeatureIcon: {
        width: 34,
        height: 34,

        alignItems: "center",
        justifyContent: "center",

        marginBottom: 12,

        backgroundColor: colors.acctCardAlt,

        borderRadius: 10,
    },

    guestFeatureIconText: {
        color: colors.acctText,
        fontSize: 16,
    },

    guestFeatureTitle: {
        color: colors.acctText,
        fontSize: 15,
        marginBottom: 8,
        fontWeight: "600",
    },

    guestFeatureDescription: {
        marginTop: 0,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 20,
    },

    guestFeatureHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    guestStepsCard: {
        marginTop: 22,

        padding: 18,
        marginHorizontal: 10,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    guestSteps: {
        flexDirection: "row",

        gap: 16,
    },

    guestStep: {
        flex: 1,

        flexDirection: "row",

        gap: 10,
    },

    guestStepNumber: {
        width: 26,
        height: 26,

        flexShrink: 0,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctAccent,

        borderRadius: 8,
    },

    guestStepNumberText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "700",
    },

    guestStepContent: {
        flex: 1,
    },

    guestStepTitle: {
        color: colors.acctText,
        fontSize: 13,
        fontWeight: "600",
    },

    guestStepDescription: {
        marginTop: 4,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 18,
    },
});