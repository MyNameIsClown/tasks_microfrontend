import axiosInstance from './AxiosConfig'
import { BoardDTO } from '../Dto/BoardDTO'

export const getBoards = async () => {
    const response = await axiosInstance.get('/boards')
    const fetchedBoards = response.data.map((board: any) => 
        new BoardDTO(board.id, board.name, board.description)
    );
    return fetchedBoards
}

export const createBoard = async (name: string, description: string) => {
    const response = await axiosInstance.post('/boards/', 
        {
            name: name,
            description: description,
        }
    )
    const data = response.data

    const board = new BoardDTO(
        data.id, 
        data.name, 
        data.description
    )
    return board
}

export const updateBoard = async (board: BoardDTO) => {
    const response = await axiosInstance.put(`/boards/${board.id}`, board)
    return response.data
}

export const deleteBoard = async (board: BoardDTO) => {
    const response = await axiosInstance.delete(`/boards/${board.id}/`)
    return response.data
}

