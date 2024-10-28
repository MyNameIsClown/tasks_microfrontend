import axiosInstance from './AxiosConfig'
import { BoardStatusDTO } from '../Dto/BoardStatusDTO'

export const getBoardStatus = async (boardId: number) => {
    const response = await axiosInstance.get(`/board_status/?board=${boardId}`)
    const fetchedTasks = response.data.map((status: any) => 
        new BoardStatusDTO(status.id, status.name, status.description, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const getAllStatus = async () => {
    const response = await axiosInstance.get('/board_status/')
    const fetchedTasks = response.data.map((status: any) => 
        new BoardStatusDTO(status.id, status.name, status.description, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const createStatus = async (status: BoardStatusDTO) => {
    const response = await axiosInstance.post('/board_status/', 
        {
            title: status.titulo,
            description: status.descripcion,
            created_at: status.fechaCreacion,
            updated_at: status.fechaActualizacion
        }
    )
    return response.data
}

export const updateStatus = async (status: BoardStatusDTO) => {
    const response = await axiosInstance.put(`/board_status/${status.id}`, status)
    return response.data
}

export const deleteStatus = async (status: BoardStatusDTO) => {
    const response = await axiosInstance.delete(`/board_status/${status.id}/`)
    return response.data
}

