import { TaskDTO } from '../Dto/TaskDTO'
import './TaskCardComponent.css'; // Asegúrate de importar el archivo CSS
import { TaskStatusSelector } from './selectors/TaskStausSelector';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function TaskCardComponent({task, handleDelete}: {task: TaskDTO, handleDelete: () => void}) {
    
  return (
    <Card className="task-card">
        <CardContent>
          <h1 className="task-title">{task.titulo}</h1>
          <p className="task-description">{task.descripcion}</p>
          <TaskStatusSelector selectedStatus={task.estado} disabled={true}/>
          <p className="task-date">{task.fechaActualizacion.toISOString()}</p>
          <p className="task-date">{task.fechaCreacion.toISOString()}</p>
          <button onClick={handleDelete} className="delete-button">Delete Task</button>
        </CardContent>
    </Card>
  )
}

export { TaskCardComponent }
