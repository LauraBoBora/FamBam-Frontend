// https://mdbootstrap.com/docs/standard/extended/to-do-list/

import { useEffect, useState } from "react";
import NewBam from '../components/NewBam';
import NavBar from '../components/NavBar';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Modal, Container, Card, Nav, Navbar, Button } from "react-bootstrap/";
import { MDBBtn } from 'mdb-react-ui-kit'
import '@fortawesome/fontawesome-free/css/all.min.css';
import EditDeleteHousehold from "../components/EditDeleteHH";
import Kids from "./Kids";
import Bams from "./Bams";
import axios from 'axios';


const Household = () => {
    // set up states
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [myHousehold, setMyHousehold] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditHHModal, setShowEditHHModal] = useState(false);
    const [user, setUser] = useState(null);

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

    const fetchUser = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true }
            );
            const { status } = data;
            if (!status) {
                removeCookie('token');
                navigate('/login');
            }
            setUser(data);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchUser();
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
                        {user?.isParent ? (
                            <MDBBtn tag="a" size="lg" onClick={handleShowEditModal}>Edit Household</MDBBtn>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <br/>
            </div>
        </div>
        <br/>
        {user?.isParent ? (
        <>
            <Kids />
            <br/>
        </>
        ) : (<></>)
        }       
        <Bams />
        <br/>
        <Container>
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
        </Modal>
        </>
    );
}

export default Household;