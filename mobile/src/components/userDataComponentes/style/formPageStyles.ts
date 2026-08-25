import { StyleSheet } from "react-native";
import { colors } from "../../../style/theme";

export const formPageStyles = StyleSheet.create({
    formPage: {
        flex: 1,
    },

    pageBaseOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: "rgba(6, 7, 10, 0.5)",
    },

    topOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,

        height: 300,
    },

    formContainer: {
        width: "100%",
        maxWidth: 720,

        alignSelf: "center",

        paddingHorizontal: 0,
        paddingBottom: 16,
    },

    formColumn: {
        width: "100%",
    },

    backLink: {
        flexDirection: "row",
        alignItems: "center",

        gap: 5,

        marginBottom: 16,
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

    // Row layout so an avatar can sit next to the title. pageHeadingText wraps
    // the eyebrow/title/description column so it can shrink instead of overlapping.
    pageHeading: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",

        gap: 12,

        marginTop: 16,
        marginBottom: 14,
    },

    pageHeadingText: {
        flex: 1,
    },

    // Placeholder avatar (initials) until a real profile photo / asset exists.
    avatarCircle: {
        width: 52,
        height: 52,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
        borderRadius: 26,

        flexShrink: 0,
    },

    avatarText: {
        color: colors.acctText,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.4,
    },

    pageEyebrow: {
        marginBottom: 6,

        color: colors.acctAccent,
        fontSize: 11,
        fontWeight: "700",

        letterSpacing: 1,
        textTransform: "uppercase",
    },

    pageTitle: {
        color: colors.acctText,
        fontSize: 24,
        fontWeight: "600",

        letterSpacing: -0.5,
    },

    pageDescription: {
        maxWidth: 480,

        marginTop: 5,

        color: colors.acctTextSecondary,
        fontSize: 13,
        lineHeight: 18,
    },

    form: {
        gap: 10,
    },

    // Semi-transparent "glass" card over the background photo. overflow: hidden
    // is required for the rounded corners to clip a BlurView, if/when added.
    formCard: {
        padding: 14,
        paddingTop: 0,
        marginBottom: -10,

        backgroundColor: "rgba(73, 73, 73, 0.1)",

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.07)",
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 4,
        marginRight: -6,
        marginLeft: -6,
        overflow: "hidden",
    },

    settingsCard: {
        marginTop: 20,
        marginRight: -6,
        marginLeft: -6,
        marginBottom: -10,

        padding: 14,

        backgroundColor: "rgba(37, 37, 37, 0.1)",

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.07)",
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 4,
        overflow: "hidden",
    },

    formCardHeader: {
        marginBottom: 14,
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
        gap: 10,
    },

    formGridItem: {
        flex: 1,
    },

    formField: {
        color: colors.acctTextSecondary,
    },

    formLabel: {
        marginBottom: 5,

        color: colors.acctTextSecondary,
        fontSize: 12,
        fontWeight: "600",
    },



    

    fieldLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,

        marginBottom: 0,
        marginTop: 5,
        marginLeft: 5,
    },


    choiceBtnContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    // Stronger, more visible focus ring so users clearly see which field is active.
    formControlFocused: {
        borderColor: colors.acctAccent,
        borderWidth: 1.5,

        backgroundColor: colors.acctCard,

        shadowColor: colors.acctAccent,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,

        elevation: 0,
    },

    choiceGroup: {
        width: "100%",

        flexDirection: "row",

        gap: 8,
        marginBottom: 10,
    },

    choiceBtn: {
        flex: 1,

        minHeight: 48,
        paddingVertical: 10,
        paddingHorizontal: 12,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.07)",
        borderRadius: 12,
    },

    choiceBtnPressed: {
        backgroundColor: colors.acctCard,
    },

    choiceBtnText: {
        color: colors.acctTextSecondary,
        fontSize: 13,
        fontWeight: "600",
    },

    // Active state now "lifts" with a shadow, so the state doesn't rely on color alone.
    choiceBtnActive: {
        backgroundColor: colors.acctAccent,
        borderColor: colors.acctAccent,

        shadowColor: colors.acctAccent,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 2,
    },

    choiceBtnActiveText: {
        color: colors.white,
    },

    goalList: {
        marginTop: 10,

        flexDirection: "row",

        gap: 8,
    },

    // Full card per goal (icon slot + title + description) instead of a single-line
    // list row, matching the reference design's 3-up grid.
    goalBtn: {
        flex: 1,

        alignItems: "center",

        paddingVertical: 16,
        paddingHorizontal: 8,

        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.07)",
        borderRadius: 16,

        gap: 8,
    },

    goalBtnPressed: {
        backgroundColor: colors.acctCard,
        
    },

    // Whole-card highlight: subtle tinted fill + accent border + glow, matching the
    // reference. Distinct from the plain left-bar treatment used elsewhere because
    // this is a compact card in a grid, not a full-width list row.
    goalBtnActive: {
        backgroundColor: "rgba(47, 111, 214, 0.10)",
        borderColor: colors.acctAccent,
        borderWidth: 1.5,

    },

    // Placeholder circle for the future goal icon asset (SVG/PNG will sit inside this).
    goalIconWrap: {
        width: 44,
        height: 44,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderRadius: 22,
    },

    goalIconWrapActive: {
        backgroundColor: "rgba(47, 111, 214, 0.18)",
    },

    goalBtnText: {
        color: colors.acctTextSecondary,
        fontSize: 12.5,
        fontWeight: "700",
        textAlign: "center",
    },

    goalBtnActiveText: {
        color: colors.acctAccent,
    },

    goalBtnDescription: {
        color: colors.acctTextSecondary,
        fontSize: 10.5,
        lineHeight: 14,
        textAlign: "center",

        opacity: 0.8,
    },

    goalBtnDescriptionActive: {
        color: colors.acctText,
        opacity: 0.85,
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 39,
        paddingBottom: 110,
    },

    stickyFooter: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,

        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 4,


    },

    // Outer wrapper for the CTA — keeps the glow shadow. The LinearGradient
    // itself is styled by primaryCtaGradient below (it provides the fill,
    // padding, and radius; this only owns the shadow so both layers agree
    // on shape without fighting over background color).
    formSubmit: {
        marginTop: 0,
        marginBottom: 47,

        shadowColor: colors.acctAccent,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 18,
        elevation: 5,

        borderRadius: 16,
    },

    // Applied to the <LinearGradient> that sits inside the Pressable, replacing a
    // flat backgroundColor with the blue gradient fill + light glow border seen
    // in the reference.
    primaryCtaGradient: {
        minHeight: 54,

        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 14,
        paddingHorizontal: 20,

        borderRadius: 16,
        overflow: "hidden", // обов'язково — обрізає і blur, і градієнт під заокруглені кути

        borderWidth: 1.5,
        borderColor: "#5b9dff15",
    },

    settingsHeader: {
        marginBottom: 8,
    },

    // Clearer divider and a bit more vertical room so each row breathes on its own.
    settingsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 16,

        paddingVertical: 19,

        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.12)",
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
        minWidth: 138,

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
        borderRadius: 10,
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

        logoutModal: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 24,

    },

    modalContent: {
        width: "100%",
        maxWidth: 360,

        padding: 20,

        backgroundColor: colors.acctCard,

        borderWidth: 1,
        borderColor: colors.acctBorder,
        borderRadius: 18,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 16,
        },
        shadowOpacity: 0.24,
        shadowRadius: 48,

        elevation: 10,
    },

    modalHeader: {
        marginBottom: 8,
    },

    modalTitle: {
        color: colors.acctText,
        fontSize: 18,
        fontWeight: "700",
    },

    modalBody: {
        marginBottom: 20,
    },

    modalText: {
        color: colors.acctTextSecondary,
        fontSize: 14,
        lineHeight: 21,
    },

    modalFooter: {
        flexDirection: "row",

        gap: 10,
    },

    modalAction: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 12,

        borderRadius: 12,
    },

    modalCancel: {
        backgroundColor: colors.acctCardAlt,

        borderWidth: 1,
        borderColor: colors.acctBorder,
    },

    modalCancelPressed: {
        opacity: 0.7,
    },

    modalCancelText: {
        color: colors.acctText,
        fontSize: 14,
        fontWeight: "600",
    },

    modalConfirm: {
        backgroundColor: "#e5484d",
    },

    modalConfirmPressed: {
        opacity: 0.85,
    },

    modalConfirmText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: "700",
    },
});