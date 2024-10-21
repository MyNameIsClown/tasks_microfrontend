// import { TaskDTO } from "../../Dto/TaskDTO";
import { TaskStatusDTO } from "../../Dto/TaskStatusDTO";
import { getStatus } from "../../services/TasksStatusService";
import { useEffect, useState } from "react";

export const TasksStatusModal = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
    const [status, setStatus] = useState<TaskStatusDTO[]>([]);

    useEffect(() => {
        getStatus().then(setStatus);
    }, []);

    return (
        <div className="modal-container" style={{display: isOpen ? 'block' : 'none'}}>
            <div className="modal-content">
                {status.map((status) => (
                    <div key={status.id}>
                        <h1>{status.titulo}</h1>
                    </div>
                ))}
            </div>

        </div>
    )
}