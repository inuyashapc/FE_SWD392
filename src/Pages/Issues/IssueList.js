import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom'

const IssueList = () => {
    const [issueList, setIssueList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Define a function to fetch issue data
        const fetchIssueData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/issues");
                setIssueList(response.data); // Assuming the API returns an array of issues
            } catch (error) {
                console.error("Error fetching issue list:", error);
            }
        };

        // Call the function to fetch data when the component mounts
        fetchIssueData();
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    const onAddIssue = () => {
        navigate(`/issue/create`);
    };

    const handleDetail = async (issue_id) => {
        try {
            // Fetch the specific issue details using the issue_id
            const response = await axios.get(`http://localhost:8080/issues/${issue_id}`);
            // Handle the response data as needed
            console.log("Issue details:", response.data);
            console.log("Issue id:", issue_id);
            // Now you can navigate to the detail page with the issue details
            navigate(`/issue/${issue_id}`);
        } catch (error) {
            console.error("Error fetching issue details:", error);
        }
    };

    return (
        <>
            <h1 className="text-center mb-5">Issue List</h1>
            <Container>
                <Button className="mb-3 mt-3 ml-auto" variant="primary" onClick={onAddIssue}>
                    Add Issue
                </Button>
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
                            <th>Action</th>
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
                                <td>
                                    <Button variant="info" onClick={() => handleDetail(issue.issue_id)}>
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default IssueList;
