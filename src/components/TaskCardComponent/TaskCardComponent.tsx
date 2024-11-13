import { TaskDTO } from '../../Dto/TaskDTO'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, TextField} from '@mui/material';
import { FaTrashAlt } from "react-icons/fa";
import './TaskCardComponent.css';
import { useEffect } from 'react';

function TaskCardComponent({task, handleDelete}: {task: TaskDTO, handleDelete: () => void}) {
  useEffect(() => {
    console.log(task)
  }, [task])

  return (
    <Card className="task-card">
        <CardContent className="task-card-content">
          <h1 className="task-title">{task.name}</h1>
          <TextField label="Descripción" value={task.description} disabled={true} fullWidth={true} multiline rows={4}/>
          {/* <Button 
            onClick={handleDelete} 
            className="delete-button"
            color='error'
            variant='contained'
          >
              Delete Task
              <FaTrashAlt />
          </Button> */}
        </CardContent>
    </Card>
  )
}

export { TaskCardComponent }
