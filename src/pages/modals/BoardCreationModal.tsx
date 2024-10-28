import { ModalCore } from './core/ModalCore';
import { Button, TextField} from "@mui/material";
import { BoardDTO } from "../../Dto/BoardDTO";
import { createBoard } from "../../services/BoardsService";

export const BoardCreationModal = ({ onClose, setBoardCreated }: { onClose: () => void, setBoardCreated: (board: BoardDTO) => void }) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const board = await createBoard(
            formData.get('title') as string,
            formData.get('description') as string
        )
        console.log(board)
        setBoardCreated(board)
        onClose()
    }

    return (
        <ModalCore onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    name="title"
                    label="Title"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">Create Board</Button>
            </form>
        </ModalCore>
    )
}