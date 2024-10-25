import { TaskCardComponent } from '../TaskCardComponent/TaskCardComponent'
import { TasksCreationModal } from '../../pages/modals/TasksCreationModal'
import { TaskDTO } from '../../Dto/TaskDTO'
import { useState, useEffect } from 'react'
import { getTasks, deleteTask } from '../../services/TasksService'
import { Container, Grid2, Button } from '@mui/material'
import { FaPlus } from 'react-icons/fa'

export function BoardComponent() {
    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
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
            { taskCreationModalIsOpen && <TasksCreationModal onClose={() => setTaskCreationModalIsOpen(false)} setTaskCreated={(task) => setTaskCreated(task)} />}
        </Container>
    )
}