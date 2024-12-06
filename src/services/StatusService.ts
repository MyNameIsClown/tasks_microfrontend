import axiosInstance from './AxiosConfig'
import { StatusDTO } from '../Dto/StatusDTO'

export const getStatus = async (id: Number) => {
    const response = await axiosInstance.get(`/status/`+ id)
    const fetchedTasks = response.data.map((status: any) => 
        new StatusDTO(status.id, status.name, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const getAllStatus = async () => {
    const response = await axiosInstance.get('/status/')
    const fetchedTasks = response.data.map((status: any) => 
        new StatusDTO(status.id, status.name, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const createStatus = async (name: String) => {
    const response = await axiosInstance.post('/status/', 
        {
            name: name,
        }
    )
    return response.data
}

export const updateStatus = async (status: StatusDTO) => {
    const response = await axiosInstance.put(`/status/${status.id}`, status)
    return response.data
}

export const deleteStatus = async (status: StatusDTO) => {
    const response = await axiosInstance.delete(`/status/${status.id}/`)
    return response.data
}

