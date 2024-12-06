// import { TaskDTO } from "../../Dto/TaskDTO";
import { useState, useEffect} from 'react';

import { ModalCore } from './core/ModalCore';
import { TextField, Button } from '@mui/material';
import { createStatus, getAllStatus } from '../../services/StatusService';
import { StatusDTO } from '../../Dto/StatusDTO';

export const StatusModal = ({ onClose }: { onClose: () => void }) => {
    const [status, setStatus] = useState<StatusDTO[] | null>(null)

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getAllStatus())
        }

        fetchStatus();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const statusCreated = await createStatus(
            formData.get("name") as string
        )
        status?.push(statusCreated)
        setStatus(status)
    }

    return (
        <ModalCore onClose={onClose} modalName='Default Status configuration'>
            
            {status?.map((state) =>(
                <TextField
                    value={state.name}
                    margin="normal"
                    disabled={true}
                />
            ))}

            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    name="name"
                    label="Name"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </ModalCore>
    )
}