import { useState } from 'react'
import { TasksStatusModal } from './modals/TasksStatusModal'
import { BoardComponent } from '../components/BoardComponent/BoardComponent'
import { Button, Container} from '@mui/material'
import { FaGear} from "react-icons/fa6";
import './Home.css'; 
import { BoardDTO } from '../Dto/BoardDTO';
import { BoardSelector } from '../components/selectors/BoardSelector';

function Home() {
    // Inicializar con null explícitamente
    const [selectedBoard, setSelectedBoard] = useState<BoardDTO | null>(null);
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
    const [boardDeleted, setBoardDeleted] = useState<BoardDTO | null>(null);
    
    // Asegurarse de que handleBoardChange siempre reciba un valor definido
    const handleBoardChange = (board: BoardDTO | null) => {
        setSelectedBoard(board);
    };

    const handleBoardDelete = (board: BoardDTO) => {
        setBoardDeleted(board)
        setSelectedBoard(null)
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
            <BoardSelector 
                handleBoardChange={handleBoardChange}
                selectedBoard={selectedBoard} // Pasar el valor seleccionado actual
                boardDeleted={boardDeleted}
            />
            { selectedBoard && <BoardComponent board={selectedBoard} setBoardDeleted={handleBoardDelete}/> }
            { statusModalIsOpen && <TasksStatusModal onClose={() => setStatusModalIsOpen(false)} />}
        </Container>
    )
}

export { Home }
