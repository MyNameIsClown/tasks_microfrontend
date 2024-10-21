import { TaskCardComponent } from '../components/TaskCardComponent'
import { TaskDTO } from '../Dto/TaskDTO'
import { getTasks, createTask, deleteTask } from '../services/TasksService'
import { useState, useEffect } from 'react'
import { TasksStatusModal } from './modals/TasksStatusModal'

function Home() {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(await getTasks())
        };

        fetchTasks();
    }, [taskDeleted, taskCreated]);

    const handleDelete = async (task: TaskDTO) => {
        console.log(task)
        await deleteTask(task)
        setTaskDeleted(task)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const title = formData.get('title')
        const description = formData.get('description')
        const task = new TaskDTO(0, title as string, description as string, "new", new Date(), new Date())
        await createTask(task)
        setTaskCreated(task)
    }
    return (
        <div className="task-container">
            {tasks.map((task) => (
                <TaskCardComponent key={task.id} task={task} handleDelete={() => handleDelete(task)} />
            ))}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <button type="submit">Create Task</button>
            </form>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <TasksStatusModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
        </div>
    )
}

export { Home }
