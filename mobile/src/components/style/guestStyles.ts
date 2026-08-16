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

        paddingTop: 56,
        paddingHorizontal: 16,
        paddingBottom: 72,
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

        paddingVertical: 7,
        paddingHorizontal: 11,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 999,
    },

    guestHeroBadgeText: {
        color: colors.acctTextSecondary,
        fontSize: 12,
        fontWeight: "600",
    },

    guestHeroTitle: {
        marginTop: 18,
        marginBottom: 12,

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

    guestAuthCard: {
        width: "100%",
        maxWidth: 470,

        alignSelf: "center",

        marginTop: 28,

        padding: 22,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 18,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 16,
        },
        shadowOpacity: 0.18,
        shadowRadius: 48,

        elevation: 8,
    },

    guestAuthCopy: {
        width: "100%",
    },

    guestAuthTitle: {
        color: colors.acctText,
        fontSize: 18,
        fontWeight: "600",
    },

    guestAuthDescription: {
        marginTop: 6,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 20,
    },

    guestAuthActions: {
        gap: 10,

        marginTop: 18,
    },

    guestAuthPrimary: {
        marginBottom: 0,
    },

    guestAuthSecondary: {
        marginBottom: 0,
        backgroundColor: "transparent",
    },

    guestAuthNote: {
        marginTop: 14,

        color: colors.acctTextMuted,
        fontSize: 11,
        lineHeight: 16,

        textAlign: "center",
    },

    guestFeatureGrid: {
        width: "100%",

        flexDirection: "row",

        gap: 14,

        marginTop: 58,
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
        fontWeight: "600",
    },

    guestFeatureDescription: {
        marginTop: 8,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 20,
    },

    guestStepsCard: {
        marginTop: 22,

        padding: 18,

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
