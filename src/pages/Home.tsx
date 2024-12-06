import { useEffect, useState } from 'react'
import { StatusModal } from './modals/StatusModal'
import { BoardComponent } from '../components/BoardComponent/BoardComponent'
import { Button, Container} from '@mui/material'
import { FaGear} from "react-icons/fa6";
import './Home.css'; 
import { BoardDTO } from '../Dto/BoardDTO';
import { BoardSelector } from '../components/selectors/BoardSelector';
import { BoardCreationModal } from './modals/BoardCreationModal';

function Home() {
    // Inicializar con null explícitamente
    const [selectedBoard, setSelectedBoard] = useState<BoardDTO | null>(null);
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
    const [boardDeleted, setBoardDeleted] = useState<BoardDTO | null>(null);
    const [boardCreationModalIsOpen, setBoardCreationModalIsOpen] = useState(false);
    const [isBoardsUpdates, setIsBoardsUpdates] = useState(false);
    
    // Asegurarse de que handleBoardChange siempre reciba un valor definido
    useEffect(() => {
        handleBoardChange(null)
    }, [isBoardsUpdates])

    const handleBoardChange = (board: BoardDTO | null) => {
        setSelectedBoard(board);
    };

    const handleBoardDelete = (board: BoardDTO) => {
        setBoardDeleted(board)
        setSelectedBoard(null)
        setIsBoardsUpdates(!isBoardsUpdates)
    }

    const openBoardCreationModal = () => {
        setBoardCreationModalIsOpen(true)
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
                isBoardsUpdated={isBoardsUpdates}
            />
            <Button onClick={() => openBoardCreationModal()}>Crear tablero</Button>
            { boardCreationModalIsOpen && <BoardCreationModal onClose={() => setBoardCreationModalIsOpen(false)} setIsBoardsUpdates={() => setIsBoardsUpdates(!isBoardsUpdates)} handleBoardChange={handleBoardChange}/>}
            { selectedBoard && <BoardComponent board={selectedBoard} setBoardDeleted={handleBoardDelete} handleBoardChange={handleBoardChange}/> }
            { statusModalIsOpen && <StatusModal onClose={() => setStatusModalIsOpen(false)} />}
        </Container>
    )
}

export { Home }
