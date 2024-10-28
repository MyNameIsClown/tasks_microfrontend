// import { TaskDTO } from "../../Dto/TaskDTO";
import { ModalCore } from './core/ModalCore';

export const TasksStatusModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <ModalCore onClose={onClose}>
            <div>
                <h2>Default Status configuration</h2>
            </div>
            {/* <TaskStatusSelector /> */}
        </ModalCore>
    )
}