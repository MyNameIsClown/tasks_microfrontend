import axiosInstance from './AxiosConfig'
import { TaskDTO } from '../Dto/TaskDTO'

export const getTasks = async (boardId: number) => {
    const response = await axiosInstance.get(`/tasks`, {params: {board: boardId}})
    const fetchedTasks = response.data.map((task: any) => 
        new TaskDTO(task.id, task.name, task.description, task.status, task.board, new Date(task.created_at), new Date(task.updated_at))
    );
    return fetchedTasks
}

export const createTask = async (titulo: string, descripcion: string, estado: number, boardId: number) => {
    const response = await axiosInstance.post('/tasks/', 
        {
            name: titulo,
            description: descripcion,
            status: estado,
            board: boardId
        }
    )
    const data = response.data
    const task = new TaskDTO(
        data.id, 
        data.name, 
        data.description, 
        data.status,
        data.board,
        new Date(data.created_at), 
        new Date(data.updated_at)
    )
    return task
}

export const updateTask = async (task: TaskDTO) => {
    const response = await axiosInstance.put(`/tasks/${task.id}/`, task)
    const data = response.data
    const updatedTask = new TaskDTO(
        data.id, 
        data.name, 
        data.description, 
        data.status,
        data.board,
        new Date(data.created_at), 
        new Date(data.updated_at)
    )
    return updatedTask
}

export const deleteTask = async (task: TaskDTO) => {
    const response = await axiosInstance.delete(`/tasks/${task.id}/`)
    return response.data
}

