import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import { useCreateUserMutation } from "../../api/userApi";
import { useProfileToken } from "../../hooks/useProfileToken";
import { ProfileFormFields } from "./profileFormFields";
import { styles } from "../../style";

type Goal = "lose" | "maintain" | "gain";

interface ReduxUser {
    id: number | null;
    name: string;
    age: number | null;
    gender: string;
    height: number | null;
    weight: number | null;
    goal: Goal | null;
}

interface RootState {
    user: ReduxUser;
}

/**
 * Onboarding form for users who don't have a profile yet.
 * No back link, no account settings — those only make sense
 * once a profile exists (see EditProfileForm).
 */
export function CreateProfileForm() {
    const { user: authUser, isLoading } = useAuth0();
    const { t } = useTranslation();
    const reduxUser = useSelector((state: RootState) => state.user);

    // Token is still prepared here because createUser needs an
    // Authorization header, even though we don't fetch a summary.
    useProfileToken();

    const [createUser, { isLoading: isSaving }] = useCreateUserMutation();

    const handleSubmit = async () => {
        if (
            isLoading ||
            isSaving ||
            !authUser?.sub
        ) {
            return;
        }

        if (
            !reduxUser.name ||
            reduxUser.age == null ||
            !reduxUser.gender ||
            reduxUser.height == null ||
            reduxUser.weight == null ||
            !reduxUser.goal
        ) {
            return;
        }

        const requestData = {
            name: reduxUser.name,
            age: reduxUser.age,
            gender: reduxUser.gender,
            height: reduxUser.height,
            weight: reduxUser.weight,
            goal: reduxUser.goal,
            auth0Id: authUser.sub,
        };

        try {
            await createUser(requestData).unwrap();
            router.replace("/account");
        } catch (error) {
            console.error(
                "Unable to create user profile:",
                error
            );
        }
    };

    return (
        <ScrollView
            style={styles.formPage}
            contentContainerStyle={{
                paddingVertical: 16,
                paddingHorizontal: 16,
            }}
            showsVerticalScrollIndicator={false}
        >
            <View>
                <View style={styles.formContainer}>
                    <View style={styles.formColumn}>
                        <View style={styles.pageHeading}>
                            <Text style={styles.pageEyebrow}>
                                {t("user_form.profile_setup_label")}
                            </Text>

                            <Text style={styles.pageTitle}>
                                {t("user_form.profile_setup_title")}
                            </Text>

                            <Text style={styles.pageDescription}>
                                {t("user_form.profile_setup_description")}
                            </Text>
                        </View>

                        <View style={styles.form}>
                            <ProfileFormFields />

                            <Pressable
                                style={[
                                    styles.primaryCta,
                                    styles.formSubmit,
                                    isSaving && styles.primaryCtaDisabled,
                                ]}
                                disabled={isSaving}
                                onPress={handleSubmit}
                            >
                                {isSaving ? (
                                    <ActivityIndicator size="small" color="#ffffff" />
                                ) : (
                                    <Text style={styles.primaryCtaText}>
                                        {t("user_form.title_create")}
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default CreateProfileForm;