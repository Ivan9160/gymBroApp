import { useAuth0 } from "react-native-auth0";
import { useTranslation } from "react-i18next";
import { Pressable, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/slices/userSlice";

import { styles } from "./style/accountStyles";
import { router } from "expo-router";
const AUTH0_CUSTOM_SCHEME = "gymbro";


const LogoutButton = () => {
    const { clearSession } = useAuth0();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    

    const handleLogout = async () => {
        try {
            await clearSession(
                undefined,
                {
                    customScheme: "gymbro",
                }
            );

            await AsyncStorage.removeItem("token");

            dispatch(resetUser());
            router.replace("/");
            

        } catch (error) {
            console.error("Unable to logout:", error);
        }
    };

    return (
        <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
                styles.logoutBtn,
                pressed && styles.logoutBtnPressed,
            ]}
        >
            {({ pressed }) => (
                <Text
                    style={[
                        styles.logoutBtnText,
                        pressed && styles.logoutBtnPressedText,
                    ]}
                >
                    {t("nav.logout", {
                        defaultValue: "Вийти з акаунта",
                    })}
                </Text>
            )}
        </Pressable>
    );
};

export default LogoutButton;