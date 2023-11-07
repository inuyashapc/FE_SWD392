import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const IssueDetail = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssueDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/issues/${id}`);
                setIssue(response.data);
                console.log(response.data);
                console.log("id: ", id)
            } catch (error) {
                console.error("Error fetching issue details:", error);
            }
        };

        fetchIssueDetail();
    }, [id]);

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
            <Link to={`/issue/edit/${issue.issue_id}`}>
                <Button variant="primary">Edit Issue</Button>
            </Link>
            <Button variant="secondary" onClick={() => navigate('../issue')}>
                Back
            </Button>
        </Container>
    );
};

export default IssueDetail;
