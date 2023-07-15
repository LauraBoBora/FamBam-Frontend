import { useEffect, useState } from "react";
import NewTask from '../components/NewTask';
import NavBar from '../components/NavBar';
import { Modal, Container, Card, Table, Nav, Navbar, Button, Alert } from "react-bootstrap/";


const Household = () => {
    // set up states
    const [myHousehold, setMyHousehold] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // backend url
    const householdURL = `http://localhost:4000/household`;

    // fetch household data
    const fetchHouseholdData = async() => {
        try {
            let responseData = await fetch(householdURL, {credentials: 'include'});
            let householdData = await responseData.json();
            setMyHousehold(householdData);
        } catch (error) {
            console.log('Error fetching household data: ', error)
        }
    };

    useEffect(() => {
        fetchHouseholdData();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleNewTask = () => {
        setShowModal(false);
    };

    return (
        <>
        <NavBar />
        <Container>
            <Card>
                <Card.Header>
                    <Navbar className="bg-body-tertiary">
                    <Nav >
                        <Navbar.Brand>{myHousehold.householdName}</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleShowModal}>Edit/Delete Household</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
                <Card.Header>
                    <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand>Tasks</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleShowModal}>New Task</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
                {myHousehold ? 
                (
                <Alert key="info">No Tasks!</Alert>
                )
                :
                (
                <Table>
                <thead>
                    <tr>
                    <th>Kid</th>
                    <th>Task</th>
                    <th>Due</th>
                    <th>Completed</th>
                    </tr>
                </thead>
                </Table>
                )}
            </Card>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewTask handleNewTask={handleNewTask}/>
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

export default Household;