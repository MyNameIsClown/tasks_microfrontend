import { TaskCardComponent } from '../TaskCardComponent/TaskCardComponent'
import { TasksCreationModal } from '../../pages/modals/TasksCreationModal'
import { TaskDTO } from '../../Dto/TaskDTO'
import { useState, useEffect } from 'react'
import { getTasks, deleteTask } from '../../services/TasksService'
import { getBoardStatus } from '../../services/BoardStatusService'
import { Container, Grid2, Button } from '@mui/material'
import { FaPlus, FaCog, FaTrashAlt } from 'react-icons/fa'
import { BoardDTO } from '../../Dto/BoardDTO'
import { BoardStatusDTO } from '../../Dto/BoardStatusDTO'
import './BoardComponent.css'
import ConfirmDeleteModal from '../../pages/modals/core/ConfirmDeleteModal/ConfirmDeleteModal'
import { deleteBoard } from '../../services/BoardsService'
import { BoardConfigModal } from '../../pages/modals/BoardConfigModal/BoardConfigModal'

export function BoardComponent({ board, setBoardDeleted }: { board: BoardDTO | null, setBoardDeleted: (board: BoardDTO) => void }) {

    const [taskDeleted, setTaskDeleted] = useState<TaskDTO | null>(null);
    const [status, setStatus] = useState<BoardStatusDTO[]>([]);
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [taskCreated, setTaskCreated] = useState<TaskDTO | null>(null);
    const [taskCreationModalIsOpen, setTaskCreationModalIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<BoardStatusDTO | null>(null);
    const [boardStatusModalIsOpen, setBoardStatusModalIsOpen] = useState(false);
    const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getBoardStatus(board?.id as number))
        }

        fetchStatus();
    }, [board?.id])

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

    const handleTaskCreation = (status: BoardStatusDTO) => {
        setSelectedStatus(status)
        setTaskCreationModalIsOpen(true)
    }

    const handleDeleteBoard = async () => {
        await deleteBoard(board!)
        setBoardDeleted(board!)
    }

    return (
        <Container className='board-container'>
            <div className='board-header'>
                <h2>{board?.name}</h2>
                <div className='board-header-buttons'>
                    <Button variant='contained' onClick={() => setBoardStatusModalIsOpen(true)}>
                        <FaCog />
                    </Button>
                    <Button variant='contained' color='error' onClick={() => setConfirmDeleteModalIsOpen(true)}>
                        <FaTrashAlt />
                    </Button>
                </div>
            </div>
            {
                confirmDeleteModalIsOpen 
                && 
                <ConfirmDeleteModal 
                    onClose={() => setConfirmDeleteModalIsOpen(false)}
                    onConfirm={() => handleDeleteBoard()}
                />
            }
            {
                boardStatusModalIsOpen 
                && 
                <BoardConfigModal 
                    onClose={() => setBoardStatusModalIsOpen(false)}
                    board={board!}
                />
            }
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