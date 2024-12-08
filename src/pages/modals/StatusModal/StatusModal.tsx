import "./StatusModal.css"
import { useState, useEffect} from 'react';

import { ModalCore } from '../core/ModalCore/ModalCore';
import ConfirmDeleteModal from "../core/ConfirmDeleteModal/ConfirmDeleteModal";
import { TextField, Button } from '@mui/material';
import { createStatus, getAllStatus, deleteStatus } from '../../../services/StatusService';
import { StatusDTO } from '../../../Dto/StatusDTO';
import { FaTrashAlt, FaPen } from "react-icons/fa";


export const StatusModal = ({ onClose }: { onClose: () => void }) => {
    const [status, setStatus] = useState<StatusDTO[] | null>(null)
    const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState<boolean>(false)
    const [statusIdToDelete, setStatusIdToDelete] = useState<Number | null>(null)

    useEffect(() => {
        const fetchStatus = async () => {
            setStatus(await getAllStatus())
        }

        fetchStatus();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const statusCreated = await createStatus(
            formData.get("name") as string
        )
        status?.push(statusCreated)
        setStatus(status)
    }

    const handleDelete = async () => {
        console.log("Eliminando")
    }

    const activateEditionMode = () =>{
        console.log("Activando el modo edición")
    }
    const openDeleteModal = (id: number) => {
        setConfirmDeleteModalIsOpen(true)
        setStatusIdToDelete(id)
        console.log(statusIdToDelete)
    }

    return (
        <ModalCore onClose={onClose} modalName='Default Status configuration'>
            
            <div className='status_data'>
                <div className='status_list'>
                    {status?.map((state) =>(
                        <div className='status-item' id={state.id.toString()}>
                            <TextField
                                fullWidth
                                value={state.name}
                                margin="normal"
                                disabled={true}
                            />
                            <div className='status-item-buttons'>
                                <Button
                                    variant="contained"
                                    onClick={activateEditionMode}
                                >
                                    <FaPen/>
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={openDeleteModal(1)}
                                >
                                    <FaTrashAlt/>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        name="name"
                        label="Name"
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                </form>
            </div>
            {confirmDeleteModalIsOpen && <ConfirmDeleteModal  onClose={()=>{setConfirmDeleteModalIsOpen(false)}} onConfirm={handleDelete}/>}
        </ModalCore>
    )
}