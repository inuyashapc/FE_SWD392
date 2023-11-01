import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddIssue = () => {
        console.log(formData);
    };

    return (
        <Container>
            <h1 className="text-center mb-5">New Issue</h1>
            <Form>
                <Form.Group className="mb-3" controlId="project_id">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="issue_id">
                    <Form.Label>Issue ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="issue_id"
                        value={formData.issue_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="assigner_id">
                    <Form.Label>Assigner ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="assigner_id"
                        value={formData.assigner_id}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="assigner_id">
                    <Form.Label>Issue Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="issue_title"
                        value={formData.issue_title}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="assigner_id">
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

                <Button variant="primary" onClick={handleAddIssue}>
                    Add Issue
                </Button>
            </Form>
        </Container>
    );
};

export default NewIssue;
