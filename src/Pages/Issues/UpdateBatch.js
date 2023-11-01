import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const UpdateBatch = ({ batch, onUpdate }) => {
  return (
    <Container>
      <h1 className="text-center mb-5">Update Batch</h1>
      <Card>
        <Card.Body>
          <Card.Title>Batch ID: {batch.batch_id}</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={batch.start_date}
                onChange={onUpdate}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={batch.end_date}
                onChange={onUpdate}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Button variant="primary">Save Changes</Button>
    </Container>
  );
};

export default UpdateBatch;
