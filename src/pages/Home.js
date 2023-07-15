import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import NewHousehold from "../components/NewHousehold";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userHHId, setUserHHId] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user, householdId } = data;
      console.log(data);
      setUserHHId(householdId);
      console.log(userHHId);
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
            toastId: 'loginsuccess',
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie, userHHId]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  }  
  const Household = () => {
    navigate("/household"); 
  };

  const handleCreateHousehold = () => {
    setShowModal(true);
  };

  const handleNewHousehold = (hh_data) => {
    setUserHHId(hh_data.id);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  


  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
        <div>{!userHHId? (
          <div>
          <Button>Join a Household</Button>
          <Button onClick={handleCreateHousehold}>Create a Household</Button>
          </div>
        ) : (<Button onClick={Household}>My House</Button>)}</div>
      </div>
      <ToastContainer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewHousehold handleNewHousehold={handleNewHousehold}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* {showModal && <NewHousehold handleCloseModal={handleCloseModal}/>} */}
    </>
  );
};

export default Home;

// https://mdbootstrap.com/docs/standard/extended/to-do-list/