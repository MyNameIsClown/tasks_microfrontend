// import { TaskDTO } from "../../Dto/TaskDTO";
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { BoardDTO } from "../../Dto/BoardDTO";
import { getBoards } from "../../services/BoardsService";

export const BoardSelector = ({ 
    handleBoardChange, 
    selectedBoard,
    fullWidth, 
    margin, 
    required,
    isBoardsUpdated
}: { 
    handleBoardChange: (board: BoardDTO | null) => void, 
    selectedBoard: BoardDTO | null,
    fullWidth?: boolean, 
    margin?: "none" | "dense" | "normal", 
    required?: boolean,
    isBoardsUpdated: boolean
}) => {
    const [boards, setBoards] = useState<BoardDTO[]>([]);


    useEffect(() => {
        const fetchBoards = async () => {
            setBoards(await getBoards())
        };

        fetchBoards();
    }, [isBoardsUpdated, selectedBoard]);

    const handleBoardSelect = (event: any) => {
        const board = boards.find((board) => board.id === event.target.value)
        if (board) {
            handleBoardChange(board)
        }
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
        </FormControl>
    )
}
