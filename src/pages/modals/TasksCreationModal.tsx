import { TaskDTO } from "../../Dto/TaskDTO";
import { createTask } from "../../services/TasksService";
import { ModalCore } from './core/ModalCore/ModalCore';
import { Button, TextField} from "@mui/material";
import { StatusDTO } from "../../Dto/StatusDTO";

export const TasksCreationModal = (
    { 
        onClose, 
        setTaskCreated, 
        boardId, 
        status
    }: 
    { 
        onClose: () => void, 
        setTaskCreated: (task: TaskDTO) => void, 
        boardId: number, 
        status: StatusDTO 
    }
) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const task = await createTask(
            formData.get('title') as string,
            formData.get('description') as string,
            status.id,
            boardId
        )
        console.log(task)
        setTaskCreated(task)
        onClose()
    }

    return (
        <ModalCore onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    name="title"
                    label="Title"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">Create Task</Button>
            </form>
        </ModalCore>
    )
}