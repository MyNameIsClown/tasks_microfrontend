// import { TaskDTO } from "../../Dto/TaskDTO";
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { BoardDTO } from "../../Dto/BoardDTO";
import { getBoards } from "../../services/BoardsService";
import { Button } from "@mui/material";
import { BoardCreationModal } from "../../pages/modals/BoardCreationModal";

export const BoardSelector = ({ 
    handleBoardChange, 
    selectedBoard, // Nueva prop
    fullWidth, 
    margin, 
    required 
}: { 
    handleBoardChange: (board: BoardDTO | null) => void, 
    selectedBoard: BoardDTO | null,
    fullWidth?: boolean, 
    margin?: "none" | "dense" | "normal", 
    required?: boolean 
}) => {
    const [boards, setBoards] = useState<BoardDTO[]>([]);
    const [boardCreationModalIsOpen, setBoardCreationModalIsOpen] = useState(false);


    useEffect(() => {
        const fetchBoards = async () => {
            setBoards(await getBoards())
        };

        fetchBoards();
    }, []);

    const handleBoardSelect = (event: any) => {
        const board = boards.find((board) => board.id === event.target.value)
        if (board) {
            handleBoardChange(board)
        }
    }

    const openBoardCreationModal = () => {
        setBoardCreationModalIsOpen(true)
    }

    return (
        <FormControl fullWidth={fullWidth} margin={margin} required={required}>
            <InputLabel id="board-label">Boards</InputLabel>
            <Select
                labelId="board-label"
                value={selectedBoard?.id || ''} // Valor controlado
                onChange={handleBoardSelect} // Cambiar onSelect por onChange
                label="Boards"
            >
                {boards.map((board) => (
                    <MenuItem key={board.id} value={board.id}>{board.name}</MenuItem>
                ))}
            </Select>
            <Button onClick={() => openBoardCreationModal()}>Crear tablero</Button>
            {boardCreationModalIsOpen && <BoardCreationModal onClose={() => setBoardCreationModalIsOpen(false)} setBoardCreated={(board) => setBoards([...boards, board])} />}
        </FormControl>
    )
}
