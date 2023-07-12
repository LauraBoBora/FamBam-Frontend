import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import NewHousehold from "../components/NewHousehold";


const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [userHHId, setUserHHId] = useState("");
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
      setUserHHId(householdId);
      // console.log(householdId);
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
            toastId: 'loginsuccess',
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
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
        <div>{userHHId == null ? (
          <div>
          <Button>Join a Household</Button>
          <Button onClick={handleCreateHousehold}>Create a Household</Button>
          </div>
        ) : (<Button onClick={Household}>My House</Button>)}</div>
      </div>
      <ToastContainer />

      <Modal className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Create a New Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewHousehold  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {showModal && <NewHousehold handleCloseModal={handleCloseModal}/>}
    </>
  );
};

export default Home;

// https://mdbootstrap.com/docs/standard/extended/to-do-list/