import { TaskDTO } from '../Dto/TaskDTO'

function TaskCardComponent(task: TaskDTO, { handleDelete }: { handleDelete: (task: TaskDTO) => void }) {
    
  return (
    <div>
      <h1>{task.titulo}</h1>
      <p>{task.descripcion}</p>
      <p>{task.estado}</p>
      <p>{task.fechaActualizacion.toISOString()}</p>
      <p>{task.fechaCreacion.toISOString()}</p>
      <button onClick={() => handleDelete(task)}>Delete Task</button>
    </div>
  )
}

export { TaskCardComponent }
