import "./ModalCore.css";
import { FaXmark } from "react-icons/fa6";
import { Box, Button, Modal } from "@mui/material";

export const ModalCore = ({onClose, children}: {onClose: () => void, children: React.ReactNode}) => {
    return (
        <Modal open={true} onClose={onClose}>
            <Box className="modal-content">
                <div className="modal-header">
                    <Button onClick={onClose} className="close-button">
                            <FaXmark />
                    </Button>
                </div>
                {children}
            </Box>
        </Modal>
    )
}