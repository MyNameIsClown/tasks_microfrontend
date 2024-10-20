import axiosInstance from './AxiosConfig'
import { TaskDTO } from '../Dto/TaskDTO'
export const getTasks = async () => {
    const response = await axiosInstance.get('/tasks')
    const fetchedTasks = response.data.map((task: any) => 
        new TaskDTO(task.id, task.title, task.description, "new", new Date(task.created_at), new Date(task.updated_at))
    );
    return fetchedTasks
}

export const createTask = async (task: TaskDTO) => {
    const response = await axiosInstance.post('/tasks/', 
        {
            title: task.titulo,
            description: task.descripcion,
            // status: task.estado,
            created_at: task.fechaCreacion,
            updated_at: task.fechaActualizacion
        }
    )
    return response.data
}

export const updateTask = async (task: TaskDTO) => {
    const response = await axiosInstance.put(`/tasks/${task.id}`, task)
    return response.data
}

export const deleteTask = async (task: TaskDTO) => {
    const response = await axiosInstance.delete(`/tasks/${task.id}/`)
    return response.data
}

