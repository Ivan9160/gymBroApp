import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useAuth0 } from "react-native-auth0";

/**
 * Prepares and stores a valid Auth0 access token in AsyncStorage.
 * Shared by CreateProfileForm and EditProfileForm.
 */
export function useProfileToken() {
    const { getCredentials, hasValidCredentials } = useAuth0();
    const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const prepareToken = async () => {
            try {
                const validCredentials = await hasValidCredentials();

                if (!validCredentials) {
                    if (isMounted) {
                        setTokenReady(false);
                    }
                    return;
                }

                const credentials = await getCredentials();

                if (!credentials?.accessToken) {
                    throw new Error("Auth0 access token is missing");
                }

                await AsyncStorage.setItem("token", credentials.accessToken);

                if (isMounted) {
                    setTokenReady(true);
                }
            } catch (error) {
                console.error("Unable to prepare access token:", error);

                if (isMounted) {
                    setTokenReady(false);
                }
            }
        };

        prepareToken();

        return () => {
            isMounted = false;
        };
    }, [getCredentials, hasValidCredentials]);

    return { tokenReady };
}