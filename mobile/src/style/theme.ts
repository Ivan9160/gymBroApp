import { Dimensions } from "react-native";

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
