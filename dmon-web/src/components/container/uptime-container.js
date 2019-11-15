import React from 'react';

import { Col, Card, Table, Button, Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

import './containers.css'

export default ({ title, data, hostName, deviceID }) => (
      <Col className="mx-auto mt-3" sm={12}>
        <Accordion defaultActiveKey="0">
        <Card className="dark-card text-left">
            <Card.Header className="dark-card-header">
              <div className="d-flex">
                <h3 className="mb-0 text-uppercase">{title}</h3>
                <Accordion.Toggle className="ml-auto" as={Button} variant="link" eventKey="0">
                  <FontAwesomeIcon className="mt-1" size="lg" icon={faChevronDown}/>
                </Accordion.Toggle>
              </div>
              <p className="mb-0">Choose a server below to see specific information.</p>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <div>
            <Card.Body style={{color: 'white'}}>
              <Table size="sm" responsive striped hover style={{color: 'white'}}>
                <thead>
                  <tr>
                    <th style={{borderTop: 'none'}}>#</th>
                    <th style={{borderTop: 'none'}}>Name</th>
                    <th style={{borderTop: 'none'}}>UpTime (sec)</th>
                    <th style={{borderTop: 'none'}}>IP (IPV4)</th>
                    <th style={{borderTop: 'none'}}>ID</th>
                  </tr>
                </thead>
                <tbody>
                {Object.keys(data).map((dataKey, index) =>
                  <tr key={index} className="tableRow" onClick={() => window.location.href = '/live/' + dataKey}>
                    <td>{index+1}</td>
                    <td>{Object.values(hostName)[index][0]}</td>
                    <td>{data[dataKey].slice(-1)[0]}</td>
                    <td>{dataKey.replace(/(?:\.\d+){2}$/, '')+".*.*"}</td>
                    <td>{Object.values(deviceID)[index][0]}</td>
                  </tr>
                )}
                </tbody>
              </Table>
            </Card.Body>
            </div>
            </Accordion.Collapse>
        </Card>
        </Accordion>
    </Col>
)
