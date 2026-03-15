import { Button, Modal } from "react-bootstrap";

interface Props{
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}

export const FinishWorkoutModal = ({show, onHide, onConfirm}: Props) => {
    return (
        <Modal show={show} onHide = {onHide} centered className='rounded-4'>
            <Modal.Header closeButton className='border-0'>
                <Modal.Title className='fw-bold'>Finish Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to finish your workout? Your workout will be saved.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="success" onClick={onConfirm}>
                    Finish Workout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}