// import the things we need
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// create component, pass props
const EditDeleteHousehold = ({myHousehold}) => {
    // set up states
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [editHHName, setEditHHName] = useState("");

    const navigate = useNavigate();

    const goHomeAfterDeleteHH = () => {
        navigate("/"); 
    };

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    };

    // handle household name update
    const onSubmitHandler = async (e) => {
        try {
            console.log(editHHName);
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ householdName: editHHName })
            };
            const responseData = await fetch(`http://localhost:4000/household`, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update household name');
            }
            myHousehold.householdName = editHHName;
        } catch (error) {
            console.log('Error updating household name: ', error);
        }
    };

    // delete household
    const handleDeleteHousehold = async (myHousehold) => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ householdId: myHousehold.id})
            }
            const responseData = await fetch(`https://localhost:4000/household`, options);
            console.log('household deleted')
            const householdRemoved = await responseData.json()
            if (!responseData.ok) {
                throw new Error('Failed to delete household');
            }
            // navigate to home page
            goHomeAfterDeleteHH();
        } catch (error) {
            console.log('Error deleting household: ', error);
        }
    };

    const handleShowDeleteAlert = () => {
        setShowDeleteAlert(true);
      };
    
    const handleCloseDeleteAlert = () => {
        setShowDeleteAlert(false);
    };
      

    // new household form
    return (
        <div>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                <Form.Label>Household Name</Form.Label>
                <Form.Control
                    type="text"
                    value={myHousehold.householdName}
                    name="household-name"
                    placeholder="Edit Household Name"
                    onChange={(e) => onChangeHandler(e, setEditHHName)} 
                />
                </Form.Group>
                <Button variant="primary" type="submit">Edit Household Name</Button>
                <Button variant="danger" onClick={handleShowDeleteAlert}>Delete Household</Button>
                <Alert show={showDeleteAlert} variant="danger">
                    <Alert.Heading>Are you sure?</Alert.Heading>
                    <p>This action will permanently delete the household. Proceed with caution.</p>
                    <div className="d-flex justify-content-end">
                        <Button onClick={handleCloseDeleteAlert} variant="outline-danger" className="me-2">Cancel</Button>
                        <Button onClick={handleDeleteHousehold} variant="danger">Delete</Button>
                    </div>
                </Alert>
            </Form>
        </div>
    );
};

export default EditDeleteHousehold;