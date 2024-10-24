import { TaskDTO } from "../../Dto/TaskDTO";
import { createTask } from "../../services/TasksService";
import { ModalCore } from './core/ModalCore';
import { TaskStatusSelector } from "../../components/selectors/TaskStausSelector";

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
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <TaskStatusSelector name="status" />
                <button type="submit">Create Task</button>
            </form>
        </ModalCore>
    )
}