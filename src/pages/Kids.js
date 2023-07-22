import { useEffect, useState } from "react";
import { Modal, Button, Nav, Navbar, Container, Card } from "react-bootstrap"
import NewKid from "../components/NewKid";
import Kid from "../components/Kid";
import Row from 'react-bootstrap/Row';


const Kids = () => {
  // set up states
  const [myKids, setMyKids] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // backend url
  const kidsURL = `https://fambam-backend.onrender.com/kids`;

  // fetch kids data
  const fetchKidsData = async() => {
      try {
          let responseData = await fetch(kidsURL, {credentials: 'include'});
          let kidsData = await responseData.json();
          setMyKids(kidsData);
          console.log(kidsData);
      } catch (error) {
          console.log('Error fetching kids: ', error)
      }
  };

  useEffect(() => {
    // Get all the kids for this household
    fetchKidsData();
  },[]);

  // Add a new Kid Modal
  const handleCloseModal = () => {
      setShowModal(false);
  };
  const handleShowModal = () => {
      setShowModal(true);
  };
  
  // When you click 'refresh' on the frontend (added to update points when bam is verified)
  const handleRefreshKids = () => {
    fetchKidsData();
  };

  // Called from the modal to add a new kid to our state
  const handleNewKid = (newKid) => {
      setMyKids(current => [...current, newKid]);
      setShowModal(false);
  };
  // remove kid from list
  const handleDeleteKid = (kidId) => {
    setMyKids((prev) => prev.filter((p) => p._id !== kidId ));
  }

  return (
        <>
        <Container>
            <Card>
                <Card.Header>
                    <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand>Kids</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleRefreshKids} variant="link">
                          <i className="fa-solid fa-arrows-rotate"></i>
                        </Button>
                        <Button onClick={handleShowModal}>Add a Kid</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
                {myKids ? (
                  <Container>
                    <Row xs={12} md={4}>
                      {myKids.map((kid) => (
                        <Kid key={kid._id} kidData={kid} handleDelKid={handleDeleteKid} /> 
                      ))}
                    </Row>
                    <br/>
                  </Container>
                  ):(
                    "Loading..."
                  )}
            </Card>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Kid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewKid handleNewKid={handleNewKid}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default Kids;