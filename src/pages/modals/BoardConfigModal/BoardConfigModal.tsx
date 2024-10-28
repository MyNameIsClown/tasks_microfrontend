import { ModalCore } from "../core/ModalCore"
import { BoardDTO } from "../../../Dto/BoardDTO"
import { TextField, Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { getBoardStatus } from "../../../services/BoardStatusService"
import { BoardStatusDTO } from "../../../Dto/BoardStatusDTO"

const BoardConfigModal = ({ onClose, board }: { onClose: () => void, board: BoardDTO }) => {
    
    const [boardStatus, setBoardStatus] = useState<BoardStatusDTO[]>([])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        getBoardStatus(board.id).then(setBoardStatus)
    }, [board])

    return (
        <ModalCore onClose={onClose}>
            <Container>
                <form onSubmit={handleSubmit}>
                    <TextField label="Nombre del tablero" value={board.name} />
                    <TextField label="Descripción del tablero" value={board.description} multiline rows={4}/>
                </form>
            </Container>
            <Container>
                <h2>Estados del tablero</h2>
                {
                    boardStatus.map((status) => (
                        <div key={status.id}>
                            <h3>{status.titulo}</h3>
                        </div>
                    ))
                }
            </Container>
        </ModalCore>
    )
}

export { BoardConfigModal }

