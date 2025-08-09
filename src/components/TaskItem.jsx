import { MdOutlineRadioButtonUnchecked, MdOutlineCheckCircleOutline, MdDelete } from "react-icons/md";
import { updateTask } from "../apis/TaskApi"; 
import { toast } from "react-toastify";
import { useState } from "react";
import "../assets/taskItem.scss"
export default function Item({ item, handleDelete }) {
    const [completed, setCompleted] = useState(item.completed);

    const handleUpdateStatus = async () => {
        try {
            const updateData = { completed: !completed };
            const response = await updateTask(item.id, updateData);
            toast.success(response.message || "Update successfully!");
            setCompleted(!completed);
        } catch (error) {
            toast.error("Cập nhật thất bại");
            console.error(error);
        }
    };

    const onDeleteClick = (e) => {
        e.stopPropagation();
        handleDelete(item.id);
    };

    return (
        <>
            <div
                className="task-item-container d-flex justify-content-between align-items-center"
            >
                <div onClick={handleUpdateStatus} style={{ cursor: "pointer" }}>
                    {completed ? (
                        <MdOutlineCheckCircleOutline size={24} />
                    ) : (
                        <MdOutlineRadioButtonUnchecked size={24} />
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div className={completed ? "completed-task" : ""}>
                        {item.title}
                    </div>
                    <div className={completed ? "completed-task" : ""}>
                        {item.description}
                    </div>
                </div>

                <button className="delete-btn" onClick={onDeleteClick}>
                    <MdDelete />
                </button>
            </div>
        </>
    );
}
