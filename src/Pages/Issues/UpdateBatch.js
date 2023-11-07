import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const IssueDetail = () => {
    const { issue_id } = useParams();

    // Define state for the editable fields
    const [assignerId, setAssignerId] = useState(1);
    const [assigneeId, setAssigneeId] = useState(2);
    const [issueTitle, setIssueTitle] = useState("Sample Issue 1");
    const [issueDescription, setIssueDescription] = useState("This is a sample issue description for issue 1.");

    const handleSaveChanges = () => {
        // Save the changes (you can implement this part)
        // For now, we'll just display an alert
        alert('Changes saved');
    };

    return (
        <Container>
            <h1 className="text-center mb-5">Issue Detail</h1>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="assignerId">
                            <Form.Label>Assigner ID:</Form.Label>
                            <Form.Control
                                type="text"
                                value={assignerId}
                                onChange={(e) => setAssignerId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="assigneeId">
                            <Form.Label>Assignee ID:</Form.Label>
                            <Form.Control
                                type="text"
                                value={assigneeId}
                                onChange={(e) => setAssigneeId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="issueTitle">
                            <Form.Label>Issue Title:</Form.Label>
                            <Form.Control
                                type="text"
                                value={issueTitle}
                                onChange={(e) => setIssueTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="issueDescription">
                            <Form.Label>Issue Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
            </Button>
            <Link to={`../issue`}>
                <Button variant="secondary">Cancel</Button>
            </Link>
        </Container>
    );
};

export default IssueDetail;
