import React, { useEffect } from 'react';
import { Modal, Button, Divider } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

interface ConfirmModalProps {
    id: number;
    text?: string;
    visible?: boolean;
    onConfirm: (id: number) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    id,
    text,
    visible = false,
    onConfirm,
    setVisible
}) => {
    const handleOpen = () => setVisible(true);
    const handleClose = () => setVisible(false);
    useEffect(() => {
        // Cuando la propiedad visible cambia, actualiza el estado local 'open'
        if (visible) {
            handleOpen();
        } else {
            handleClose();
        }
    }, [visible]);

    return (
        <Modal backdrop="static" role="alertdialog" open={visible} onClose={handleClose} size="xs">
            <Modal.Header>
                <Modal.Title><RemindIcon style={{ color: '#ffb300', fontSize: 24 }} /> Advertencia</Modal.Title>
            </Modal.Header>
            <Divider />
            <Modal.Body>
                
                {text ? (
                    <p>{text}</p>
                ) : (
                    <p>Are you sure you want to proceed?</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onConfirm(id)} appearance="primary">
                    Ok
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
