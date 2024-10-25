import { useState } from 'react'
import { TasksStatusModal } from './modals/TasksStatusModal'
import { BoardComponent } from '../components/BoardComponent/BoardComponent'
import { Button, Container} from '@mui/material'
import { FaGear} from "react-icons/fa6";
import './Home.css';

function Home() {
    
    
    const [statusModalIsOpen, setStatusModalIsOpen] = useState(false);
    

    return (
        <Container>
            <Container className='header-container'>
                <h1>Tareas</h1>
                <Button onClick={() => setStatusModalIsOpen(true)}>
                    Configurar estados de las tareas 
                    <FaGear />
                </Button>
            </Container>
            <BoardComponent />
            { statusModalIsOpen && <TasksStatusModal onClose={() => setStatusModalIsOpen(false)} />}
        </Container>
    )
}

export { Home }
