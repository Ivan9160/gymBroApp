import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface Props{
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}

export const FinishWorkoutModal = ({show, onHide, onConfirm}: Props) => {
    const {t, i18n} = useTranslation();
    return (
        <Modal show={show} onHide = {onHide} centered className='rounded-4'>
            <Modal.Header closeButton className='border-0'>
                <Modal.Title className='fw-bold'>{t('active_workout.finish_modal_title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('active_workout.finish_modal_body')}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    {t('active_workout.cancel_btn')}
                </Button>
                <Button variant="success" onClick={onConfirm}>
                    {t('active_workout.finish_btn')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}