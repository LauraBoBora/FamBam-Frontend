import { useEffect, useState } from "react";
import NewBam from '../components/NewBam';
import NavBar from '../components/NavBar';
import { Modal, Container, Card, Table, Nav, Navbar, Button, Alert } from "react-bootstrap/";
import { MDBBtn } from 'mdb-react-ui-kit'
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditDeleteHousehold from "../components/EditDeleteHH";
import Kids from "./Kids";
import Bams from "./Bams";



const Household = () => {
    // set up states
    const [myHousehold, setMyHousehold] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditHHModal, setShowEditHHModal] = useState(false);

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
    const handleNewBam = () => {
        setShowModal(false);
    };

    // edit/delete household
    const handleShowEditModal = () => {
        setShowEditHHModal(true);
    };
      
    const handleCloseEditModal = () => {
        setShowEditHHModal(false);
    };
      

    return (
        <>
        <NavBar />
        <div className='p-5 text-center bg-image' style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <br/>
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='text-white'>
                        <h1 className='mb-3' >{myHousehold ? (myHousehold.householdName) : ("Loading...")}</h1>
                        <MDBBtn tag="a" size="lg" onClick={handleShowEditModal}>Edit Household</MDBBtn>
                    </div>
                </div>
                <br/>
            </div>
        </div>
        <br/>
        <Kids />
        <br/>
        <Bams />
        <Container>
            <Card>
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
                {!myHousehold ? (
                <Alert key="info">No Tasks!</Alert>
                ) : (
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
                <tr className="fw-normal">
                    <th>
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                        className="shadow-1-strong rounded-circle"
                        alt="avatar 1"
                        style={{ width: "55px", height: "auto" }}
                    />
                    <span className="ms-2">Alice Mayer</span>
                    </th>
                    <td className="align-middle">
                    <span>Call Sam For payments</span>
                    </td>
                    <td className="align-middle">
                    <h6 className="mb-0">
                        <span className="badge bg-danger">High priority</span>
                    </h6>
                    </td>
                    <td className="align-middle">100</td>
                    <td className="align-middle">
                    <a href="#!" data-mdb-toggle="tooltip" title="Done">
                        <i className="fas fa-check text-success me-3"></i>
                    </a>
                    <a href="#!" data-mdb-toggle="tooltip" title="Remove">
                        <i className="fas fa-trash-alt text-danger"></i>
                    </a>
                    </td>
                </tr>
                </tbody>
                </Table>
                )}
            </Card>
            <Card>
            <Card.Header>
                    <Navbar>
                    <Nav className="me-auto">
                        <Navbar.Brand>Awards</Navbar.Brand> 
                    </Nav>
                    <Nav>
                        <Button onClick={handleShowModal}>Add Award</Button>
                    </Nav>
                    </Navbar>
                </Card.Header>
            </Card>
        </Container>


        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create a New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewBam handleNewBam={handleNewBam}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        
        <Modal show={showEditHHModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Household</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditDeleteHousehold myHousehold={myHousehold} />
            </Modal.Body>
            <Modal.Footer>
                {/* Add buttons for saving changes, deleting the household, or closing the modal */}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Household;