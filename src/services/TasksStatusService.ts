import axiosInstance from './AxiosConfig'
import { TaskStatusDTO } from '../Dto/TaskStatusDTO'

export const getStatus = async () => {
    const response = await axiosInstance.get('/tasks_status/')
    const fetchedTasks = response.data.map((status: any) => 
        new TaskStatusDTO(status.id, status.name, status.description, new Date(status.created_at), new Date(status.updated_at))
    );
    return fetchedTasks
}

export const createStatus = async (status: TaskStatusDTO) => {
    const response = await axiosInstance.post('/tasks_status/', 
        {
            title: status.titulo,
            description: status.descripcion,
            created_at: status.fechaCreacion,
            updated_at: status.fechaActualizacion
        }
    )
    return response.data
}

export const updateStatus = async (status: TaskStatusDTO) => {
    const response = await axiosInstance.put(`/tasks_status/${status.id}`, status)
    return response.data
}

export const deleteStatus = async (status: TaskStatusDTO) => {
    const response = await axiosInstance.delete(`/tasks_status/${status.id}/`)
    return response.data
}

