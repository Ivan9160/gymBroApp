import { Modal, Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { styles } from "../../../style";

interface Props {
show: boolean;
onHide: () => void;
onConfirm: () => void;
}

export const FinishWorkoutModal = ({
show,
onHide,
onConfirm,
}: Props) => {
const { t } = useTranslation();

return (
    <Modal
        visible={show}
        transparent
        animationType="fade"
        onRequestClose={onHide}
    >
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
                backgroundColor: "rgba(0, 0, 0, 0.65)",
            }}
        >
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                        {t("active_workout.finish_modal_title")}
                    </Text>

                    <Pressable
                        onPress={onHide}
                        accessibilityRole="button"
                        accessibilityLabel={t(
                            "active_workout.cancel_btn"
                        )}
                        style={({ pressed }) => [
                            styles.modalClose,
                            pressed && styles.modalClosePressed,
                        ]}
                    >
                        <Text style={styles.modalCloseText}>
                            ×
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.modalBody}>
                    <Text style={styles.modalText}>
                        {t("active_workout.finish_modal_body")}
                    </Text>
                </View>

                <View style={styles.modalFooter}>
                    <Pressable
                        onPress={onHide}
                        style={({ pressed }) => [
                            styles.modalAction,
                            styles.modalCancel,
                            pressed && styles.modalCancelPressed,
                        ]}
                    >
                        <Text style={styles.modalCancelText}>
                            {t("active_workout.cancel_btn")}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onConfirm}
                        style={({ pressed }) => [
                            styles.modalAction,
                            styles.modalConfirm,
                            pressed && styles.modalConfirmPressed,
                        ]}
                    >
                        <Text style={styles.modalConfirmText}>
                            {t("active_workout.finish_btn")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
);

};
