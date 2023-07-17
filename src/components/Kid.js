import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Form, Modal, Button, ButtonGroup } from 'react-bootstrap';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

const EditKidModal = ({handleEditKid, kidId}) => {
    // set up states
    const [username, setKidUserName] = useState("");
    const [password, setKidPW] = useState("");

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    };
    // when form is submitted
    const onSubmitHandler = async (e) => {
        // don't reload
        e.preventDefault();
        const updateKid = {
            username: username,
            password: password
        };
        console.log("New Kid, yo: ", updateKid);
        // set the new kid state
        setKidUserName('');
        setKidPW('');
        // and post
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateKid),
            credentials: 'include'
        };
        try {
            const responseData = await fetch (`http://localhost:4000/kids/`+kidId, options);
            if (responseData.ok) {
              const newKidObj = await responseData.json();
              console.log("newKidObj: " , newKidObj);
            } else {
            console.log('Failed to update kiddo', responseData.status);
            }
            handleEditKid(updateKid.username);
        } catch (error) {
            console.log('Error: ', error);
        } 
    }
  return (
    <div>
    <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
            <Form.Label>Kid Name</Form.Label>
            <Form.Control
                type="text"
                value={username}
                name="kid-name"
                placeholder="Enter Your Kiddo's Name"
                onChange={(e) => onChangeHandler(e, setKidUserName)} 
            />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Kid Password</Form.Label>
        <Form.Control
            type="password"
            value={password}
            name="kid-password"
            placeholder="Enter Your Kiddo's Temporary Password"
            onChange={(e) => onChangeHandler(e, setKidPW)} 
        />
        </Form.Group>
        <Button variant="primary" type="submit">
        Update Kiddo
        </Button>
    </Form>
  </div>
  )
};

const Kid = ({kidData, handleDelKid}) => {

  const [showModal, setShowModal] = useState(false);
  const [kidName, setKidName] = useState(kidData.username);

  const handleCloseModal = () => {
  setShowModal(false);
  };

  const handleShowModal = () => {
      setShowModal(true);
  };

  const handleEditKid = (newName) => {
    setKidName(newName);
    setShowModal(false);
  }

  const handleDeleteKid = async() => {
    const options = {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
      },
      credentials: 'include'
      };
      try {
        const responseData = await fetch (`http://localhost:4000/kids/`+kidData._id, options);
        if (responseData.ok) {
          const newKidObj = await responseData.json();
        } else {
          console.log('Failed to delete kiddo', responseData.status);
        }
        handleDelKid(kidData._id);
      } catch (error) {
          console.log('Error: ', error);
      } 
  }

  return (
    <>
      <MDBCol key={kidData.id} sm="6" md="6" lg="4" className="mt-4">
        <MDBListGroup style={{ minWidth: '15rem' }} light>
          <MDBListGroupItem className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: '45px', height: '45px' }}
                    className="rounded-circle"
                />
                <div className="ms-3">
                    <p className="fw-bold mb-1">{kidName}</p>
                    <p className="text-muted mb-0">Points: 321</p>
                </div>
              </div>
            <ButtonGroup>
              <Button onClick={handleShowModal} size="sm" variant='link'><i className="fas fa-pencil"></i></Button>
              <Button onClick={handleDeleteKid} size="sm" variant='link'><i className="fas fa-trash-alt text-danger"></i></Button>
            </ButtonGroup>
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBCol>

      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
              <Modal.Title>Edit {kidName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <EditKidModal handleEditKid={handleEditKid} kidId={kidData._id} />
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          </Modal.Footer>
      </Modal>
    </>
  )
};

export default Kid;
