// import the things we need
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// create component, pass props
const NewHousehold = ({handleNewHousehold}) => {

    // set up states
    const [myHousehold, setMyHousehold] = useState("");

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    };
    // when form is submitted
    const onSubmitHandler = async (e) => {
        // don't reload
        e.preventDefault();
        const newHousehold = {
            householdName: myHousehold
        };
        console.log("New Household, yo: ", newHousehold);
        // set the new household state
        setMyHousehold('');
        // and post
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHousehold),
            credentials: 'include'
        };
        try {
            const responseData = await fetch (`https://fambam-backend.onrender.com/household`, options);
            if (responseData.ok) {
            const newHHObj = await responseData.json();
            console.log("newHHObj: " , newHHObj);
            handleNewHousehold(newHHObj._id);
            } else {
            console.log('Failed to create household', responseData.status);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
        
    }

  // new household form
  return (
    <div>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
            <Form.Label>Household Name</Form.Label>
            <Form.Control
                type="text"
                value={myHousehold}
                name="household-name"
                placeholder="Enter Household Name"
                onChange={(e) => onChangeHandler(e, setMyHousehold)} 
            />
            </Form.Group>
            <Button variant="primary" type="submit">
            Create a New Household
            </Button>
        </Form>
    </div>
  );
};

export default NewHousehold;