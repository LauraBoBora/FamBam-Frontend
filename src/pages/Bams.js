import { useEffect, useState } from "react";
import { Modal, Button, Nav, Navbar, Container, Card, Table } from "react-bootstrap"
import NewBam from "../components/NewBam";
import Bam from '../components/Bam';
import axios from 'axios';


const Bams = () => {
  // set up states
  const [theBams, setMyBams] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
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

  const fetchUserData = async() => {
      try {
          const { data } = await axios.post(
              "http://localhost:4000",
              {},
              { withCredentials: true }
          );
          setUser(data);
      } catch(error) {
          console.log(error)
      }
  };

  useEffect(() => {
    fetchUserData();
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
                    {user?.isParent ? (
                    <Nav>
                        <Button onClick={handleShowModal}>New Bam</Button>
                    </Nav>
                    ) : (<></>)
                    } 
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
                    <th>Status</th>
                    <th>Actions</th>
                    {user?.isParent ? (<th>Parent Action</th>) : (<th>Kid Action</th>) }
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