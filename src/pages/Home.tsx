import { TaskCardComponent } from '../components/TaskCardComponent'
import { TaskDTO } from '../Dto/TaskDTO'
import { getTasks, deleteTask } from '../services/TasksService'
import { useState, useEffect } from 'react'
import { TasksStatusModal } from './modals/TasksStatusModal'
import { TasksCreationModal } from './modals/TasksCreationModal'
import { Button, Container, Grid2} from '@mui/material'
import { FaGear, FaPlus} from "react-icons/fa6";
import './Home.css';

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
        <Container>
            <Container className='header-container'>
                <h1>Tareas</h1>
                <Button onClick={() => setStatusModalIsOpen(true)}>
                    Configurar estados de las tareas 
                    <FaGear />
                </Button>
            </Container>
            <Container>
                {tasks.length > 0 ? (
                    <Grid2 container spacing={2}>
                        {tasks.map((task) => (
                            <Grid2 size={{xs: 12, sm: 6, md: 4}} key={task.id} className='tasks-card-container'>
                                <TaskCardComponent task={task} handleDelete={() => handleDelete(task)} />
                            </Grid2>
                        ))}
                        <Grid2 size={{xs: 12, sm: 6, md: 4}} key='create-task-button' className='tasks-card-container'>
                            <Button variant='contained' onClick={() => setTaskCreationModalIsOpen(true)}>
                                Crear tarea 
                                <FaPlus />
                            </Button>
                        </Grid2>
                    </Grid2>
                ) : (
                    <h2>No hay tareas</h2>
                )}
            </Container>            
            { statusModalIsOpen && <TasksStatusModal onClose={() => setStatusModalIsOpen(false)} />}
            { taskCreationModalIsOpen && <TasksCreationModal onClose={() => setTaskCreationModalIsOpen(false)} setTaskCreated={(task) => setTaskCreated(task)} />}
        </Container>
    )
}

export { Home }
