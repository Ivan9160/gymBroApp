import { StyleSheet } from "react-native";
export const exerciseAnimationStyles = StyleSheet.create({ 
    exerciseAnimationWrap: {
        width: "100%",
        height: 180,

        marginTop: 4,
        marginBottom: 4,

        borderRadius: 10,
        overflow: "hidden",

        backgroundColor: "rgba(255, 255, 255, 0.04)",
    },
    

    exerciseAnimationImage: {
        width: "100%",
        height: "100%",
    },

    exerciseAnimationPlaceholder: {
        width: "100%",
        height: "100%",

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 10,

        backgroundColor: "rgba(255, 255, 255, 0.04)",
    },

});