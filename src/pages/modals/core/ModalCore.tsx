import "./ModalCore.css";
import { FaXmark } from "react-icons/fa6";
import { Box, Button, Modal } from "@mui/material";

export const ModalCore = ({
    onClose,
    children,
    modalName
}: {
    onClose: () => void;
    children: React.ReactNode;
    modalName: string;
}) => {
    return (
        <Modal 
            open={true} 
            onClose={onClose} 
            disableAutoFocus /* Opcional, mejora experiencia en algunos navegadores */
        >
            <Box className="modal-content">
                <div className="modal-header">
                    <h2>{modalName}</h2>
                    <Button onClick={onClose} className="close-button">
                        <FaXmark />
                    </Button>
                </div>
                <div className="modal-body">{children}</div>
            </Box>
        </Modal>
    );
};
