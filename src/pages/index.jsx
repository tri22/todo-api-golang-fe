import { Button, Container } from "react-bootstrap";
import CreateForm from "../components/CreateForm";
import TaskItem from "../components/TaskItem";
import { useEffect, useState } from "react";
import { getAllTask, deleteTask, createTask } from "../apis/TaskApi";
import { toast } from "react-toastify";
import "../assets/index.scss"

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const fetchTasks = async () => {
        try {
            const response = await getAllTask();
            const data = response.data;
            
            if (data) {
                setTasks(data);
            }
        } catch (error) {
            toast.error("Failed to fetch tasks");
            console.error(error);
        }
    };


    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            // update local task list when delete successfully
            setTasks(prev => prev.filter(task => task.id !== id));
            toast.success("Delete task successfully!");
        } catch (error) {
            toast.error("Fail to delete task");
            console.error(error);
        }
    };

    const handleCreateTask = async (creationData) => {
        try {
            const response = await createTask(creationData);
            toast.success(response.message || "Task created successfully");
            // reload task list when create successfully
            await fetchTasks();
            setShowModal(false);

        } catch (error) {
            toast.error("Fail to add new task");
            console.error(error);
        }

    };

    // load task every time this page mount
    useEffect(() => {
        fetchTasks()

    }, [])

    return (
        <Container  className="border rounded mb-5 pb-5 task-container">
            <div className="d-flex justify-content-around align-items-center my-5">
                <h3>My Tasks</h3>
                <Button variant="outline-dark" type="submit" onClick={handleShowModal}>
                    Create Task
                </Button>
            </div>
            <div className="task-list-wrapper">
                {tasks.length > 0 ? (
                    tasks.map((item) => (
                        <TaskItem key={item.id} item={item} handleDelete={handleDeleteTask}></TaskItem>
                    ))
                ) : (
                    <p>There is no task</p>
                )}
            </div>
            <CreateForm show={showModal} handleCloseModal={handleCloseModal} handleCreateTask={handleCreateTask} />
        </Container>
    )
}

