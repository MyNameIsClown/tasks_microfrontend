import { TaskDTO } from '../Dto/TaskDTO'
import './TaskCardComponent.css'; // Asegúrate de importar el archivo CSS

function TaskCardComponent({task, handleDelete}: {task: TaskDTO, handleDelete: () => void}) {
    
  return (
    <div className="task-card">
      <h1 className="task-title">{task.titulo}</h1>
      <p className="task-description">{task.descripcion}</p>
      <p className="task-status">{task.estado}</p>
      <p className="task-date">{task.fechaActualizacion.toISOString()}</p>
      <p className="task-date">{task.fechaCreacion.toISOString()}</p>
      <button onClick={handleDelete} className="delete-button">Delete Task</button>
    </div>
  )
}

export { TaskCardComponent }
