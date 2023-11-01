import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { getAllIssue } from '../../Services/Issue.Service'
import { useNavigate } from 'react-router-dom'


const IssueList = () => {

    const [issueList, setIssueList] = useState([]);
    const navigate = useNavigate();


    const getIssueList = async () => {
        try {
            const result = await getAllIssue();
            setIssueList(result.data);
        } catch (error) {
            console.error("Error fetching issue list:", error);
        }
    };

    useEffect(() => {
        getIssueList();
    }, []);

    const onAddIssue = () => {
        navigate(`/issue/create`);
    };

    return (
        <>
            <h1 className="text-center mb-5">Issue List</h1>
            <Container>
                <Button className="mb-3 mt-3 ml-auto" variant="primary" onClick={onAddIssue}>Add Issue</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Issue ID</th>
                            <th>Assigner ID</th>
                            <th>Assignee ID</th>
                            <th>Issue Title</th>
                            <th>Issue Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issueList.map((issue, index) => (
                            <tr key={index}>
                                <td>{issue.project_id}</td>
                                <td>{issue.issue_id}</td>
                                <td>{issue.assigner_id}</td>
                                <td>{issue.assignee_id}</td>
                                <td>{issue.issue_title}</td>
                                <td>{issue.issue_description}</td>
                                <td>{issue.start_date}</td>
                                <td>{issue.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default IssueList;
