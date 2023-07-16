import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Modal, Button, Nav, Navbar, Container, Card } from "react-bootstrap"
import NewKid from "../components/NewKid";
import Kid from "../components/Kid";
import Row from 'react-bootstrap/Row';


const Kids = () => {
  // set up states
  const [myKids, setMyKids] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // backend url
  const kidsURL = `http://localhost:4000/kids`;

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
    console.log("useEffect ran");
    fetchKidsData();
  },[]);

  const handleCloseModal = () => {
      setShowModal(false);
  };
  const handleShowModal = () => {
      setShowModal(true);
  };
  const handleNewKid = () => {
      setShowModal(false);
  };

  return (
        <>
        <NavBar />
        <Container>
            <Card>
                <Card.Header>
                    <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand>Kids</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleShowModal}>Add a Kid</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
                {myKids ? (
                  <Container className="overflow.auto">
                    <Row xs={12} md={4}>
                      {myKids.map((kid) => (
                        <Kid key={kid._id} kidData={kid} /> 
                      ))}
                    </Row>
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