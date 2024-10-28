import { TaskCardComponent } from '../TaskCardComponent/TaskCardComponent'
import { TasksCreationModal } from '../../pages/modals/TasksCreationModal'
import { TaskDTO } from '../../Dto/TaskDTO'
import { useState, useEffect } from 'react'
import { getTasks, deleteTask } from '../../services/TasksService'
import { getStatus } from '../../services/TasksStatusService'
import { Container, Grid2, Button } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { BoardDTO } from '../../Dto/BoardDTO'
import { TaskStatusDTO } from '../../Dto/TaskStatusDTO'
import './BoardComponent.css'

export function BoardComponent({ board }: { board: BoardDTO | null }) {

    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [status, setStatus] = useState<TaskStatusDTO[]>([]);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
    const [taskCreationModalIsOpen, setTaskCreationModalIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<TaskStatusDTO | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getStatus())
        }

        fetchStatus();
    }, [])

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

    const handleTaskCreation = (status: TaskStatusDTO) => {
        setSelectedStatus(status)
        setTaskCreationModalIsOpen(true)
    }

    return (
        <Container className='board-container'>
            <h2>{board?.name}</h2>
            {
                status.length > 0 ?
                <Grid2 container spacing={2} className='kanban-board'>
                    {status.map((status) => (
                        <Grid2 key={status.id} className='kanban-column' size="grow">
                            <div className='kanban-column-header'>
                                <div>{status.titulo}</div>
                                <Button variant="contained" onClick={() => handleTaskCreation(status)}>
                                    <FaPlus />
                                </Button>
                            </div>
                            <hr />
                            {tasks.filter((task : TaskDTO) => task.estado === status.id).map((task) => (
                                <TaskCardComponent key={task.id} task={task} handleDelete={() => handleDelete(task)} />
                            ))}
                        </Grid2>
                    ))}
                </Grid2>
                :
                <div>No statuses</div>
            }
            { taskCreationModalIsOpen && <TasksCreationModal onClose={() => setTaskCreationModalIsOpen(false)} setTaskCreated={(task) => setTaskCreated(task)} boardId={board?.id as number} status={selectedStatus!} />}
        </Container>
    )
}