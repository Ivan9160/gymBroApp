import { Modal, Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { modalStyles } from "../../style/accountStyles";

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
            <View style={modalStyles.modalContent}>
                <View style={modalStyles.modalHeader}>
                    <Text style={modalStyles.modalTitle}>
                        {t("active_workout.finish_modal_title")}
                    </Text>

                    <Pressable
                        onPress={onHide}
                        accessibilityRole="button"
                        accessibilityLabel={t(
                            "active_workout.cancel_btn"
                        )}
                        style={({ pressed }) => [
                            modalStyles.modalClose,
                            pressed && modalStyles.modalClosePressed,
                        ]}
                    >
                        <Text style={modalStyles.modalCloseText}>
                            ×
                        </Text>
                    </Pressable>
                </View>

                <View style={modalStyles.modalBody}>
                    <Text style={modalStyles.modalText}>
                        {t("active_workout.finish_modal_body")}
                    </Text>
                </View>

                <View style={modalStyles.modalFooter}>
                    <Pressable
                        onPress={onHide}
                        style={({ pressed }) => [
                            modalStyles.modalAction,
                            modalStyles.modalCancel,
                            pressed && modalStyles.modalCancelPressed,
                        ]}
                    >
                        <Text style={modalStyles.modalCancelText}>
                            {t("active_workout.cancel_btn")}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={onConfirm}
                        style={({ pressed }) => [
                            modalStyles.modalAction,
                            modalStyles.modalConfirm,
                            pressed && modalStyles.modalConfirmPressed,
                        ]}
                    >
                        <Text style={modalStyles.modalConfirmText}>
                            {t("active_workout.finish_btn")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
);

};
