import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

const NewIssue = () => {
    const [formData, setFormData] = useState({
        project_id: '',
        issue_id: '',
        assigner_id: '',
        assignee_id: '',
        issue_title: '',
        issue_description: '',
        start_date: '',
        end_date: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddIssue = () => {
        // Create a new issue object from the form data
        const newIssue = {
            project_id: formData.project_id,
            issue_id: formData.issue_id,
            assigner_id: formData.assigner_id,
            assignee_id: formData.assignee_id,
            issue_title: formData.issue_title,
            issue_description: formData.issue_description,
            start_date: formData.start_date,
            end_date: formData.end_date,
        };

        // Define the URL for the API endpoint (http://localhost:8080/issues/create)
        const apiUrl = 'http://localhost:8080/issues/create';

        // Send a POST request to the API with the new issue data
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newIssue),
        })
            .then((response) => {
                if (response.ok) {
                    // Issue created successfully
                    setSuccessMessage('Issue created successfully');
                    setErrorMessage('');
                } else {
                    // Handle the error if the request is not successful
                    setErrorMessage('Error creating issue');
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                // Handle any network or fetch-related errors
                setErrorMessage('Error: ' + error.message);
                setSuccessMessage('');
            })
            .finally(() => {
                // Navigate to the ../issue route after the request is complete
                navigate('../issue');
            });
    };

    return (
        <Container>
            <h1 className="text-center mb-5">New Issue</h1>
            <Form>
                <Form.Group className="mb-3" controlId="project_id">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="issue_id">
                    <Form.Label>Issue ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="issue_id"
                        value={formData.issue_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="assigner_id">
                    <Form.Label>Assigner ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="assigner_id"
                        value={formData.assigner_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="assignee_id">
                    <Form.Label>Assignee ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="assignee_id"
                        value={formData.assignee_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="issue_title">
                    <Form.Label>Issue Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="issue_title"
                        value={formData.issue_title}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="issue_description">
                    <Form.Label>Issue Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="issue_description"
                        value={formData.issue_description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="start_date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="end_date">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Button variant="primary" onClick={handleAddIssue}>
                    Add Issue
                </Button>
                <Button variant="secondary" onClick={() => navigate('../issue')}>
                    Back
                </Button>
            </Form>

        </Container>
    );
};

export default NewIssue;
