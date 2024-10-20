import { TaskCardComponent } from '../components/TaskCardComponent'
import { TaskDTO } from '../Dto/TaskDTO'
import { getTasks, createTask, deleteTask } from '../services/TasksService'
import { useState, useEffect } from 'react'

function Home() {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(await getTasks())
        };

        fetchTasks();
    }, []);

    const handleDelete = async (task: TaskDTO) => {
        await deleteTask(task)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const title = formData.get('title')
        const description = formData.get('description')
        const task = new TaskDTO(0, title as string, description as string, "new", new Date(), new Date())
        await createTask(task)
        setTasks([...tasks, task])
    }
    return (
        <div>
            {tasks.map((task) => (
                <TaskCardComponent key={task.id} {...task} handleDelete={handleDelete(task)} />
            ))}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <button type="submit">Create Task</button>
            </form>
        </div>
    )
}

export { Home }
