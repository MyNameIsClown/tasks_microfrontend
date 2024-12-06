// import { TaskDTO } from "../../Dto/TaskDTO";
import { TaskStatusDTO } from "../../Dto/StatusDTO";
import { getStatus } from "../../services/BoardStatusService";
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

export const TaskStatusSelector = ({ name, disabled, selectedStatus, required, margin, fullWidth }: { name?: string, disabled?: boolean, selectedStatus?: number, required?: boolean, margin?: "none" | "dense" | "normal", fullWidth?: boolean }) => {
    const [status, setStatus] = useState<TaskStatusDTO[]>([]);

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getStatus())
        };

        fetchStatus();
    }, []);

    return (
        <FormControl fullWidth={fullWidth} margin={margin} required={required}>
            <InputLabel id="status-label">{name}</InputLabel>
            <Select labelId="status-label" name={name} disabled={disabled} value={selectedStatus}>
                {status.map((status) => (
                    <MenuItem key={status.id} value={status.id}>{status.titulo}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}