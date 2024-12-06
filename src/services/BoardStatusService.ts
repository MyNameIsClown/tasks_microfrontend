import axiosInstance from './AxiosConfig'
import { StatusDTO } from '../Dto/StatusDTO'

export const getBoardStatus = async (boardId: number) => {
    const response = await axiosInstance.get(`/board_status/?board=${boardId}`)
    const fetchedTasks = response.data.map((status: any) => 
        new StatusDTO(status.id, status.name, status.description, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const getAllStatus = async () => {
    const response = await axiosInstance.get('/board_status/')
    const fetchedTasks = response.data.map((status: any) => 
        new StatusDTO(status.id, status.name, status.description, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const createStatus = async (status: StatusDTO) => {
    const response = await axiosInstance.post('/board_status/', 
        {
            title: status.name,
            created_at: status.fechaCreacion,
            updated_at: status.fechaActualizacion
        }
    )
    return response.data
}

export const updateStatus = async (status: StatusDTO) => {
    const response = await axiosInstance.put(`/board_status/${status.id}`, status)
    return response.data
}

export const deleteStatus = async (status: StatusDTO) => {
    const response = await axiosInstance.delete(`/board_status/${status.id}/`)
    return response.data
}

