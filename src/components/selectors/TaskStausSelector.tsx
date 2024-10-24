// import { TaskDTO } from "../../Dto/TaskDTO";
import { TaskStatusDTO } from "../../Dto/TaskStatusDTO";
import { getStatus } from "../../services/TasksStatusService";
import { useEffect, useState } from "react";

export const TaskStatusSelector = ({ name, disabled, selectedStatus }: { name?: string, disabled?: boolean, selectedStatus?: number }) => {
    const [status, setStatus] = useState<TaskStatusDTO[]>([]);

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getStatus())
        };

        fetchStatus();
    }, []);

    return (
        <select name={name} disabled={disabled} value={selectedStatus}>
            {status.map((status) => (
                <option key={status.id} value={status.id}>{status.titulo}</option>
            ))}
        </select>
    )
}