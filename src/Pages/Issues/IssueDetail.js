import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const IssueDetail = ({ issue }) => {
    return (
        <Container>
            <h1 className="text-center mb-5">Issue Detail</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Issue ID: {issue.issue_id}</Card.Title>
                    <Card.Text>
                        <strong>Project ID:</strong> {issue.project_id}
                    </Card.Text>
                    <Card.Text>
                        <strong>Assigner ID:</strong> {issue.assigner_id}
                    </Card.Text>
                    <Card.Text>
                        <strong>Assignee ID:</strong> {issue.assignee_id}
                    </Card.Text>
                    <Card.Text>
                        <strong>Issue Title:</strong> {issue.issue_title}
                    </Card.Text>
                    <Card.Text>
                        <strong>Issue Description:</strong> {issue.issue_description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Start Date:</strong> {issue.start_date}
                    </Card.Text>
                    <Card.Text>
                        <strong>End Date:</strong> {issue.end_date}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button variant="primary">Edit Issue</Button>
        </Container>
    );
};

export default IssueDetail;
