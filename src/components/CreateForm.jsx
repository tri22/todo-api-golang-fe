import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function CreateForm({ show, handleCloseModal, handleCreateTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title cannot be empty');
            return;
        }

        try {
            await handleCreateTask({ title, description });
            setTitle('');
            setDescription('');
            handleCloseModal();
        } catch (error) {
            toast.error('Failed to create task');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="taskTitle">
                        <Form.Label>Task title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="New task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" disabled={!title.trim()}>
                        Save Task
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
