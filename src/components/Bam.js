import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';

const Bam = ({bamData, handleDelBam}) => {
    // setup states
    const [kidName, setKidName] = useState("Unassigned");
    const [user, setUser] = useState(null);

    // set initial status of Bam
    const [bamStatus, setBamStatus] = useState("To Do");

    // Get the name of the kid who is assigned this Bam
    const fetchKid = async () => {
        try {
            if (bamData.assignee !== "Unassigned") {
                const response  = await fetch("http://localhost:4000/kids/"+ bamData.assignee, {credentials: 'include'});
                const data = await response.json();
                setKidName(data.username);
            } else {
                setKidName("Unassigned");
            }
        } catch(error) {
            console.log(error);
        }
    };

    // Get the current user (so we know what to show or hide)
    const fetchUser = async () => {
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

    //Deleting a Bam, also calling handleDelBam from Bams component to remove BAM from list.
    const handleDeleteBam = async() => {
        console.log("Deleting Bam");
        try {
            const options = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                credentials: 'include'
            };
            await fetch("http://localhost:4000/bams/"+bamData._id, options);
            // remove bam from list in Bams (parent) component
            handleDelBam(bamData._id);
        } catch(error) {
            console.error(error);
        }
    };

    // When a user (kid or parent) marks bam Complete
    const handleCompleteBam = async() => {
        console.log("Completing Bam");
        try {
            const res = await fetch("http://localhost:4000/bams/" + bamData._id + "/complete", {credentials: 'include', method: "PUT"});
            const resData = await res.json();
            bamData.completed = true;
            // Update status
            setBamStatus("Completed");
        } catch(error) {
            console.error(error);
        }
    };

    // If it's not really complete, reset it back to To Do.
    const handleResetBam = async() => {
        console.log("resetting Bam");
        try {
            const res = await fetch("http://localhost:4000/bams/" + bamData._id + "/reset", {credentials: 'include', method: "PUT"});
            const resData = await res.json();
            bamData.completed = true;
            setBamStatus("To Do");
        } catch(error) {
            console.error(error);
        }
    };

    // If a bam is unassigned, a KID can claim it (not a parent)
    const handleClaimBam = async() => {
        console.log("Claiming Bam");
        try {
            const res = await fetch("http://localhost:4000/bams/" + bamData._id + "/claim", {credentials: 'include', method: "PUT"});
            const resData = await res.json();
            bamData.assignee = resData.assignee;
            // fetch Kid data since this bam was previously unassigned (no kid data)
            fetchKid();
        } catch(error) {
            console.error(error);
        }
    }

    // Verify the bam, PARENT ACTION ONLY, verifies completed bam
    const handleVerifyBam = async() => {
        console.log("verifying bam");
        // verify backend will handle awarding the points to the KID
        try {
            const res = await fetch("http://localhost:4000/bams/" + bamData._id + "/verify", {credentials: 'include', method: "PUT"});
            const resData = await res.json();
            // delete the bam
            handleDeleteBam();
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // set initial status
        let status = "To Do"
        if (bamData.completed) status = "Completed";
        setBamStatus(status);
        // get logged in user to check isParent
        fetchUser();
        // Get assignee (if not unassigned)
        fetchKid();
    }, []);

    // setup the due date
    const date = dayjs(bamData.dueDate);
    bamData.dueDate = date.format("dddd, MMMM D");

    return (
    <tr key={bamData._id} >
        <th>
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                className="shadow-1-strong rounded-circle"
                alt="avatar 1"
                style={{ width: "55px", height: "auto" }}
            />
            <span className="ms-2">{kidName}</span>
        </th>
        <td className="align-middle">
            <span>{bamData.bamName}</span>
        </td>
        <td className="align-middle">
            <h6 className="mb-0">
                <span className="badge bg-danger">{bamData.dueDate}</span>
            </h6>
        </td>
        <td className="align-middle">{bamData.points}</td>
        <td className="align-middle">
            <span className={bamStatus === "To Do" ? ("badge bg-primary"):("badge bg-success")}>{bamStatus}</span>
        </td>
        <td className="align-middle">
        <ButtonGroup>
            {bamStatus === "To Do" ? 
            (
                <Button onClick={handleCompleteBam} size="sm" variant='link'><i className="fas fa-check"></i></Button>
            ) : (
                <Button onClick={handleResetBam} size="sm" variant="link">
                <i className="fa-solid fa-arrows-rotate" style={{color: "#0355e2"}}></i>
                </Button>
            )}
            {user?.isParent ? (
            <Button onClick={handleDeleteBam} size="sm" variant='link'><i className="fas fa-trash-alt text-danger"></i></Button>
            ):(
                <></>
            )}
        </ButtonGroup>
        </td>
        {user?.isParent ? (
            <td className='align-middle'>
                <ButtonGroup>
                    <Button onClick={handleVerifyBam} size="sm" variant="success" disabled={bamStatus === "To Do"}>
                        <i className="fa-solid fa-star"></i> Verify
                    </Button>
                </ButtonGroup>
            </td>
        ) : (
            <td className='align-middle'>
                {kidName === "Unassigned" ? (
                <ButtonGroup>
                    <Button onClick={handleClaimBam} size="sm">
                        Claim
                    </Button>
                </ButtonGroup>
                ) : (<></>)
                }
            </td>
        )}
    </tr>
    )
};

export default Bam;