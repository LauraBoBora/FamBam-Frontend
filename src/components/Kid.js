import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, ButtonGroup } from 'react-bootstrap';

const Kid = ({kidData}) => {

    return (
        <>
         <Card>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{kidData.kidUserName}</Card.Title>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary">Edit</Button>
                <Button variant="danger">Delete</Button>
                </ButtonGroup>
            </Card.Body>
          </Card>   
        </>
    )
};

export default Kid;
