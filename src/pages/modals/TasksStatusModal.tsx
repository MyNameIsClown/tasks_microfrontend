// import { TaskDTO } from "../../Dto/TaskDTO";
import { ModalCore } from './core/ModalCore';
import { TaskStatusSelector } from "../../components/selectors/TaskStausSelector";

export const TasksStatusModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <ModalCore onClose={onClose}>
            <TaskStatusSelector />
        </ModalCore>
    )
}