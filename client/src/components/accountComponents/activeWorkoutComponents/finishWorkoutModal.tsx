import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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
            show={show}
            onHide={onHide}
            centered
            contentClassName="acct-modal"
        >
            <div className="acct-modal-content">
                <div className="acct-modal-header">
                    <h5 className="acct-modal-title">
                        {t("active_workout.finish_modal_title")}
                    </h5>

                    <button
                        type="button"
                        className="acct-modal-close"
                        onClick={onHide}
                        aria-label={t("active_workout.cancel_btn")}
                    >
                        ×
                    </button>
                </div>

                <div className="acct-modal-body">
                    <p className="acct-modal-text">
                        {t("active_workout.finish_modal_body")}
                    </p>
                </div>

                <div className="acct-modal-footer">
                    <button
                        type="button"
                        className="acct-modal-action acct-modal-cancel"
                        onClick={onHide}
                    >
                        {t("active_workout.cancel_btn")}
                    </button>

                    <button
                        type="button"
                        className="acct-modal-action acct-modal-confirm"
                        onClick={onConfirm}
                    >
                        {t("active_workout.finish_btn")}
                    </button>
                </div>
            </div>
        </Modal>
    );
};