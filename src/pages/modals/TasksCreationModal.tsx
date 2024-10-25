import { TaskDTO } from "../../Dto/TaskDTO";
import { createTask } from "../../services/TasksService";
import { ModalCore } from './core/ModalCore';
import { TaskStatusSelector } from "../../components/selectors/TaskStausSelector";
import { Button, TextField} from "@mui/material";

export const TasksCreationModal = ({ onClose, setTaskCreated }: { onClose: () => void, setTaskCreated: (task: TaskDTO) => void }) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const task = await createTask(
            formData.get('title') as string,
            formData.get('description') as string,
            formData.get('status') as unknown as number
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
                    required
                    name="description"
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TaskStatusSelector
                    fullWidth
                    required
                    name="status" 
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Create Task</Button>
            </form>
        </ModalCore>
    )
}