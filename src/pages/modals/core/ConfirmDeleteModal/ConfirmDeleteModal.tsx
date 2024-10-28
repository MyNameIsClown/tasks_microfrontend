import { ModalCore } from "../ModalCore";
import { Button } from "@mui/material";

const ConfirmDeleteModal = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <ModalCore onClose={onClose}>
            <div>Are you sure you want to delete this board?</div>
            <div>
                <Button variant='contained' color='error' onClick={handleConfirm}>Confirm</Button>
                <Button variant='contained' onClick={onClose}>Cancel</Button>
            </div>
        </ModalCore>
    )
}

export default ConfirmDeleteModal;