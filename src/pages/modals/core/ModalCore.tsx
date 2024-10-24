import "./ModalCore.css";
import { IoMdClose } from "react-icons/io";

export const ModalCore = ({onClose, children}: {onClose: () => void, children: React.ReactNode}) => {
    return (
        <div className="modal-container">
            <div className="modal-content">
                {children}
                <button onClick={onClose}>
                    <IoMdClose />
                </button>
            </div>
        </div>
    )
}