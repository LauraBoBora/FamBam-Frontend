import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Modal, Button, Nav, Navbar, Container, Card, Table } from "react-bootstrap"
import NewBam from "../components/NewBam";
import Row from 'react-bootstrap/Row';
import Bam from '../components/Bam';


const Bams = () => {
  // set up states
  const [theBams, setMyBams] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // backend url
  const bamsURL = `http://localhost:4000/bams`;

  // fetch kids data
  const fetchBamsData = async() => {
      try {
          let responseData = await fetch(bamsURL, {credentials: 'include'});
          setMyBams(await responseData.json());
      } catch (error) {
          console.log('Error fetching bams: ', error)
      }
  };

  useEffect(() => {
    fetchBamsData();
  },[]);

  const renderBams = () => {
    return theBams.map((bam) => {
      return (
        <Bam key={bam._id} bamData={bam} handleDelBam={handleDeleteBam} /> 
      )
    })
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };
  const handleShowModal = () => {
      setShowModal(true);
  };
  const handleNewBam = (newBam) => {
      setMyBams(current => [...current, newBam]);
      setShowModal(false);
  };
  const handleDeleteBam = (bamId) => {
    setMyBams((prev) => prev.filter((p) => p._id !== bamId ));
  }

  return (
        <>
        <Container>
            <Card>
                <Card.Header>
                    <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand>Bams</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleShowModal}>New Bam</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
                <Card.Body>
                <Table className="table mb-0">
                <thead>
                    <tr>
                    <th>Kid</th>
                    <th>Bam</th>
                    <th>Due</th>
                    <th>Points</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {theBams ? (renderBams()) : (<tr></tr>)}
                </tbody>
                </Table>
                </Card.Body>
            </Card>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Bam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBam handleNewBam={handleNewBam}/>
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

export default Bams;