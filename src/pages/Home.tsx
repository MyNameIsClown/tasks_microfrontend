import { TaskCardComponent } from '../components/TaskCardComponent'
import { TaskDTO } from '../Dto/TaskDTO'
import { getTasks, createTask, deleteTask } from '../services/TasksService'
import { useState, useEffect } from 'react'
import { TasksStatusModal } from './modals/TasksStatusModal'
import { TasksCreationModal } from './modals/TasksCreationModal'

function Home() {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
    const [taskCreationModalIsOpen, setTaskCreationModalIsOpen] = useState(false);

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

    return (
        <div className="task-container">
            {tasks.map((task) => (
                <TaskCardComponent key={task.id} task={task} handleDelete={() => handleDelete(task)} />
            ))}
            
            <button onClick={() => setStatusModalIsOpen(true)}>Configurar estados de las tareas</button>
            { statusModalIsOpen && <TasksStatusModal onClose={() => setStatusModalIsOpen(false)} />}
            
            <button onClick={() => setTaskCreationModalIsOpen(true)}>Crear tarea</button>
            { taskCreationModalIsOpen && <TasksCreationModal onClose={() => setTaskCreationModalIsOpen(false)} setTaskCreated={(task) => setTaskCreated(task)} />}
        </div>
    )
}

export { Home }
