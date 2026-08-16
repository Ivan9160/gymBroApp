import { Platform, StyleSheet } from "react-native";

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
