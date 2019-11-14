import React from 'react';

import { Col, Card } from 'react-bootstrap';

export default ({ title, info, children }) => (
    <Col className="mx-auto mt-3" sm={6}>
        <Card className="dark-card text-left">
            <Card.Header className="dark-card-header ml-2">
                <h3 className="mb-0 text-uppercase">{title}</h3>
                <p className="mt-2">{info}</p>
            </Card.Header>
            <Card.Body>
               {
                   children
               }
            </Card.Body>
        </Card>
    </Col>
)
