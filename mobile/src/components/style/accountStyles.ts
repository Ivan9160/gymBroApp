import {
    Dimensions,
    Platform,
    StyleSheet,
} from "react-native";

/*
 * =========================================================
 * ACCOUNT / APP DESIGN TOKENS
 * =========================================================
 */

export const colors = {
    acctBg: "#0c0c0e",
    acctCard: "#17171b",
    acctCardAlt: "#1c1c21",

    acctBorder: "rgba(255, 255, 255, 0.08)",

    acctText: "#ffffff",
    acctTextSecondary: "rgba(255, 255, 255, 0.55)",
    acctTextMuted: "rgba(255, 255, 255, 0.35)",

    acctAccent: "#2f6fd6",
    acctAccentHover: "#2a63c0",

    acctAdminBg: "#2b2410",
    acctAdminText: "#f0a93c",
    acctAdminBorder: "#3a3020",

    acctFresh: "#639922",
    acctModerate: "#ba7517",
    acctSore: "#e24b4a",

    acctSkin: "#2a2a30",
    acctSkinStroke: "rgba(255, 255, 255, 0.08)",

    white: "#ffffff",

    blueText: "#8fbaff",
    blueLight: "#7ab3f0",

    goalGreen: "#8fce4d",

    successText: "#a9df6c",
    errorText: "#ff9c9b",
    errorTextLight: "#f27b7a",
    errorTextHover: "#ff9695",

    avatarBackground: "#1e3a5f",

    tableBorder: "rgba(255, 255, 255, 0.04)",
};

export const dimensions = {
    screenWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("window").height,
};

export const breakpoints = {
    mobileSmall: 360,
    mobile: 480,
    mobileMedium: 520,
    tablet: 760,
};

/*
 * =========================================================
 * ACCOUNT PAGE
 * =========================================================
 */

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

/*
 * =========================================================
 * FINISH WORKOUT MODAL
 * =========================================================
 */

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

/*
 * =========================================================
 * SWIPEABLE SET ITEM
 * =========================================================
 */

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

/*
 * =========================================================
 * SHARED APP SHELL
 * =========================================================
 */

export const appShellStyles = StyleSheet.create({
    appShell: {
        flex: 1,

        minHeight: "100%",

        backgroundColor: colors.acctBg,
    },

    appHeader: {
        minHeight: 60,

        backgroundColor: "rgba(12, 12, 14, 0.94)",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,

        // backdrop-filter has no direct RN equivalent.
        // Use BlurView if blur is required.
    },

    appHeaderInner: {
        minHeight: 60,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 16,

        paddingHorizontal: 16,
    },

    appBrand: {
        flexDirection: "row",
        alignItems: "center",

        gap: 9,
    },

    appBrandText: {
        color: colors.acctText,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: -0.2,
    },

    appBrandMark: {
        width: 30,
        height: 30,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctAccent,

        borderRadius: 9,
    },

    appBrandMarkText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "700",
    },

    appHeaderNav: {
        flexDirection: "row",
        alignItems: "center",

        gap: 8,
    },

    appHeaderLink: {
        margin: 0,

        paddingVertical: 7,
        paddingHorizontal: 10,

        borderRadius: 9,
    },

    appHeaderLinkText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
    },

    appHeaderLinkPressed: {
        backgroundColor: colors.acctCard,
    },

    appHeaderLinkPressedText: {
        color: colors.acctText,
    },

    appHeaderLinkSecondary: {
        color: colors.acctTextMuted,
    },

    languageSwitcher: {
        flexDirection: "row",
        alignItems: "center",

        gap: 4,

        padding: 3,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 10,
    },

    languageBtn: {
        paddingVertical: 5,
        paddingHorizontal: 8,

        backgroundColor: "transparent",

        borderRadius: 7,
    },

    languageBtnText: {
        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",
    },

    languageBtnActive: {
        backgroundColor: colors.acctAccent,
    },

    languageBtnActiveText: {
        color: colors.white,
    },

    appMain: {
        flex: 1,
        minHeight: "100%",

        backgroundColor: colors.acctBg,
    },
});

/*
 * =========================================================
 * GUEST LANDING PAGE
 * =========================================================
 */

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

/*
 * =========================================================
 * ACCOUNT FORM / PROFILE EDIT
 * =========================================================
 */

export const formPageStyles = StyleSheet.create({
    formPage: {
        flex: 1,

        backgroundColor: colors.acctBg,
    },

    formContainer: {
        width: "100%",
        maxWidth: 720,

        alignSelf: "center",

        paddingTop: 32,
        paddingHorizontal: 16,
        paddingBottom: 56,
    },

    formColumn: {
        width: "100%",
    },

    backLink: {
        flexDirection: "row",
        alignItems: "center",

        gap: 5,

        marginBottom: 18,
    },

    backLinkText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    backLinkArrow: {
        color: colors.acctTextSecondary,
        fontSize: 18,
        lineHeight: 20,
    },

    pageHeading: {
        marginBottom: 22,
    },

    pageEyebrow: {
        marginBottom: 7,

        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",

        letterSpacing: 0.7,
        textTransform: "uppercase",
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 26,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 620,

        marginTop: 8,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 21,
    },

    form: {
        gap: 14,
    },

    formCard: {
        padding: 18,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    settingsCard: {
        marginTop: 14,

        padding: 18,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 16,
    },

    formCardHeader: {
        marginBottom: 16,
    },

    formCardDescription: {
        marginTop: 3,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 18,
    },

    settingsDescription: {
        marginTop: 3,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 18,
    },

    formGrid: {
        flexDirection: "row",
        gap: 12,
    },

    formGridItem: {
        flex: 1,
    },

    formField: {
        color: colors.acctTextSecondary,
    },

    formLabel: {
        marginBottom: 8,

        color: colors.acctTextSecondary,
        fontSize: 12,
        fontWeight: "600",
    },

    formControl: {
        minHeight: 54,

        paddingHorizontal: 14,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,

        color: colors.acctText,

        shadowOpacity: 0,
        elevation: 0,
    },

    formControlFocused: {
        borderColor: "rgba(47, 111, 214, 0.75)",

        shadowColor: colors.acctAccent,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 3,

        elevation: 0,
    },

    choiceGroup: {
        width: "100%",

        flexDirection: "row",

        gap: 8,
    },

    choiceBtn: {
        flex: 1,

        paddingVertical: 11,
        paddingHorizontal: 12,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    choiceBtnPressed: {
        backgroundColor: colors.acctCardAlt,
    },

    choiceBtnText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
    },

    choiceBtnActive: {
        backgroundColor: colors.acctAccent,
        borderColor: colors.acctAccent,
    },

    choiceBtnActiveText: {
        color: colors.white,
    },

    goalList: {
        marginTop: 8,

        gap: 8,
    },

    goalBtn: {
        width: "100%",

        paddingVertical: 11,
        paddingHorizontal: 14,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 12,
    },

    goalBtnPressed: {
        backgroundColor: colors.acctCardAlt,
    },

    goalBtnActive: {
        backgroundColor: "rgba(47, 111, 214, 0.14)",
        borderColor: "rgba(47, 111, 214, 0.55)",
    },

    goalBtnText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
        textAlign: "left",
    },

    goalBtnActiveText: {
        color: colors.acctText,
    },

    formSubmit: {
        marginTop: 2,
        marginBottom: 0,
    },

    settingsHeader: {
        marginBottom: 8,
    },

    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 18,

        paddingVertical: 16,

        borderTopWidth: 1,
        borderTopColor: colors.acctBorder,
    },

    settingsRowContent: {
        flex: 1,
        minWidth: 0,
    },

    settingsRowTitle: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    settingsRowDescription: {
        marginTop: 4,

        color: colors.acctTextSecondary,
        fontSize: 12,
        lineHeight: 17,
    },

    settingsRowDanger: {
        alignItems: "center",
    },

    logoutBtn: {
        minWidth: 154,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 8,

        flexShrink: 0,

        paddingVertical: 10,
        paddingHorizontal: 13,

        backgroundColor: "transparent",

        borderWidth: 1,
        borderColor: "rgba(226, 75, 74, 0.28)",
        borderRadius: 11,
    },

    logoutBtnPressed: {
        backgroundColor: "rgba(226, 75, 74, 0.09)",
        borderColor: "rgba(226, 75, 74, 0.45)",
    },

    logoutBtnText: {
        color: colors.errorTextLight,
        fontSize: 12,
        fontWeight: "600",
    },

    logoutBtnPressedText: {
        color: colors.errorTextHover,
    },

    logoutIcon: {
        width: 15,
        height: 15,
    },
});

/*
 * =========================================================
 * LOADING
 * =========================================================
 */

export const loadingStyles = StyleSheet.create({
    loadingPage: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        padding: 24,

        backgroundColor: colors.acctBg,
    },

    loadingCard: {
        flexDirection: "row",
        alignItems: "center",

        gap: 10,

        paddingVertical: 14,
        paddingHorizontal: 16,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 14,
    },

    loadingText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
    },

    loadingSpinner: {
        width: 15,
        height: 15,
    },
});

/*
 * =========================================================
 * EXERCISE CREATOR
 * =========================================================
 */

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

/*
 * =========================================================
 * WORKOUT HISTORY
 * =========================================================
 */

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

/*
 * =========================================================
 * WORKOUT DETAILS
 * =========================================================
 */

export const detailsStyles = StyleSheet.create({
    detailsCard: {
        overflow: "hidden",

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 18,
    },

    detailsHero: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",

        gap: 18,

        padding: 22,

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

        marginTop: 9,

        color: colors.acctTextSecondary,
        fontSize: 12,
    },

    detailsDateIcon: {
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
        fontSize: 11,
        fontWeight: "700",
    },

    detailsStats: {
        flexDirection: "row",

        borderBottomWidth: 1,
        borderBottomColor: colors.acctBorder,
    },

    detailsStatsTwo: {
        // equivalent of .acct-details-stats--two
        flexDirection: "row",
    },

    detailsStat: {
        flex: 1,
        minWidth: 0,

        alignItems: "center",

        padding: 16,

        borderRightWidth: 1,
        borderRightColor: colors.acctBorder,
    },

    detailsStatLast: {
        borderRightWidth: 0,
    },

    detailsStatLabel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 5,

        color: colors.acctTextMuted,
        fontSize: 10,
        fontWeight: "700",

        letterSpacing: 0.4,
        textTransform: "uppercase",

        textAlign: "center",
    },

    detailsStatIcon: {
        color: colors.acctAccent,
    },

    detailsStatValue: {
        marginTop: 5,

        color: colors.acctText,
        fontSize: 16,
        fontWeight: "600",
    },

    detailsBody: {
        padding: 18,
    },

    detailsSectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 12,

        marginBottom: 12,
    },

    detailsSectionLabel: {
        marginBottom: 0,
    },

    detailsSectionCount: {
        color: colors.acctTextMuted,
        fontSize: 11,
    },

    detailsGroups: {
        gap: 12,
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

        backgroundColor: "rgba(255, 255, 255, 0.05)",

        borderRadius: 6,
    },

    workoutExerciseIndexText: {
        color: colors.acctTextMuted,
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

/*
 * =========================================================
 * SHARED CONTENT PAGE
 * =========================================================
 */

export const contentStyles = StyleSheet.create({
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

    pageHeading: {
        marginBottom: 22,
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 26,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 640,

        marginTop: 8,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 21,
    },

    historyHeading: {
        marginBottom: 24,
    },
});

/*
 * =========================================================
 * RESPONSIVE STYLES
 *
 * CSS:
 * @media (max-width: 760px)
 * @media (max-width: 520px)
 * @media (max-width: 480px)
 * @media (max-width: 360px)
 * =========================================================
 */

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

/*
 * =========================================================
 * EXERCISE CREATOR — DIRECT STYLES
 *
 * These names match the styles used by the component
 * supplied in the conversation.
 * =========================================================
 */

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

        marginBottom: 18,
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
        marginBottom: 22,
    },

    pageEyebrow: {
        marginBottom: 7,

        color: colors.acctTextMuted,
        fontSize: 11,
        fontWeight: "700",

        letterSpacing: 0.7,
        textTransform: "uppercase",
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 26,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 640,

        marginTop: 8,

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

/*
 * =========================================================
 * COMBINED EXPORT
 *
 * Allows:
 *
 * import { styles, colors } from "./styles/account";
 *
 * =========================================================
 */

export const styles = StyleSheet.create({
    // Account
    ...accountPageStyles,

    // App shell
    ...appShellStyles,

    // Guest
    ...guestStyles,

    // Forms
    ...formPageStyles,

    // Loading
    ...loadingStyles,

    // Creator
    ...creatorStyles,

    // History
    ...historyStyles,

    // Details
    ...detailsStyles,

    // Content
    ...contentStyles,

    // Modal
    ...modalStyles,

    // Swipe
    ...swipeStyles,

    // Exercise creator direct styles
    ...exerciseCreatorStyles,
});

/*
 * =========================================================
 * RESPONSIVE HELPER
 *
 * React Native equivalent of CSS @media.
 * =========================================================
 */

export function getResponsiveStyles() {
    const width = Dimensions.get("window").width;

    const responsive: any[] = [];

    if (width <= breakpoints.tablet) {
        responsive.push(responsiveStyles.at760GuestFeatureGrid);
        responsive.push(responsiveStyles.at760GuestSteps);
    }

    if (width <= breakpoints.mobileMedium) {
        responsive.push(responsiveStyles.at520Container);
    }

    if (width <= breakpoints.mobile) {
        responsive.push(responsiveStyles.at480SwipeCard);
    }

    if (width <= breakpoints.mobileSmall) {
        responsive.push(responsiveStyles.at360DetailsStat);
    }

    return responsive;
}

/*
 * =========================================================
 * PRESET RESPONSIVE STYLE HELPERS
 * =========================================================
 */

export function getContentContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 520) {
        return [
            styles.contentContainer,
            responsiveStyles.at520ContentContainer,
        ];
    }

    return styles.contentContainer;
}

export function getFormContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 520) {
        return [
            styles.formContainer,
            responsiveStyles.at520Container,
        ];
    }

    return styles.formContainer;
}

export function getGuestContainerStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 520) {
        return [
            styles.guestContainer,
            responsiveStyles.at520Container,
        ];
    }

    return styles.guestContainer;
}

export function getPageTitleStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 520) {
        return [
            styles.pageTitle,
            responsiveStyles.at520PageTitle,
        ];
    }

    return styles.pageTitle;
}

export function getGuestHeroTitleStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 520) {
        return [
            styles.guestHeroTitle,
            responsiveStyles.at520GuestHeroTitle,
        ];
    }

    return styles.guestHeroTitle;
}

export function getWorkoutGroupHeaderStyle() {
    const width = Dimensions.get("window").width;

    if (width <= 480) {
        return [
            styles.workoutGroupHeader,
            responsiveStyles.at480WorkoutGroupHeader,
        ];
    }

    return styles.workoutGroupHeader;
}

export function getDetailsStatsStyle(twoColumn = false) {
    const width = Dimensions.get("window").width;

    if (twoColumn) {
        return styles.detailsStatsTwo;
    }

    if (width <= 760) {
        return [
            styles.detailsStats,
            responsiveStyles.at760DetailsStats,
        ];
    }

    return styles.detailsStats;
}

/*
 * =========================================================
 * PLATFORM-SPECIFIC EQUIVALENTS
 * =========================================================
 */

export const platformStyles = StyleSheet.create({
    input: {
        ...Platform.select({
            ios: {
                paddingVertical: 14,
            },

            android: {
                paddingVertical: 10,
                includeFontPadding: false,
            },

            default: {
                paddingVertical: 12,
            },
        }),
    },

    cardShadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 16,
                },
                shadowOpacity: 0.18,
                shadowRadius: 48,
            },

            android: {
                elevation: 8,
            },

            default: {},
        }),
    },
});
