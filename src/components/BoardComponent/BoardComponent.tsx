import { TaskCardComponent } from '../TaskCardComponent/TaskCardComponent'
import { TasksCreationModal } from '../../pages/modals/TasksCreationModal'
import { TaskDTO } from '../../Dto/TaskDTO'
import { useState, useEffect } from 'react'
import { getTasks, deleteTask } from '../../services/TasksService'
import { Container, Grid2, Button } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { BoardDTO } from '../../Dto/BoardDTO'

export function BoardComponent({ board }: { board: BoardDTO | null }) {

    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
    const [taskCreationModalIsOpen, setTaskCreationModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(await getTasks(board?.id as number))
        };

        fetchTasks();
    }, [taskDeleted, taskCreated, board?.id]);
    
    const handleDelete = async (task: TaskDTO) => {
        console.log(task)
        await deleteTask(task)
        setTaskDeleted(task)
    }

    return (
        <Container className='board-container'>
            <h2>{board?.name}</h2>
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
                <Container>
                    <h2>No hay tareas</h2>
                    <Button variant='contained' onClick={() => setTaskCreationModalIsOpen(true)}>
                        Crear tarea 
                        <FaPlus />
                    </Button>
                </Container>
            )}
            { taskCreationModalIsOpen && <TasksCreationModal onClose={() => setTaskCreationModalIsOpen(false)} setTaskCreated={(task) => setTaskCreated(task)} boardId={board?.id as number} />}
        </Container>
    )
}