// import the things we need
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';


// create component, pass props
const NewKid = ({handleNewKid}) => {

    // set up states
    const [kidUserName, setKidUserName] = useState("");
    const [kidPW, setKidPW] = useState("");

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    };
    // when form is submitted
    const onSubmitHandler = async (e) => {
        // don't reload
        e.preventDefault();
        const newKid = {
            kidUserName: kidUserName,
            kidPW: kidPW
        };
        console.log("New Kid, yo: ", newKid);
        // set the new kid state
        setKidUserName('');
        setKidPW('');
        // and post
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newKid),
            credentials: 'include'
        };
        try {
            const responseData = await fetch (`http://localhost:4000/kids`, options);
            if (responseData.ok) {
                const newKidObj = await responseData.json();
                console.log("newKidObj: " , newKidObj);
                handleNewKid(newKidObj);
            } else {
                console.log('Failed to create kiddo', responseData.status);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    // useEffect(() => {
    //     //get kids
    //     //setKids
    // });

  // new kid form
  return (
    <div>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Kid Name</Form.Label>
                <Form.Control
                    type="text"
                    value={kidUserName}
                    name="kid-name"
                    placeholder="Enter Your Kiddo's Name"
                    onChange={(e) => onChangeHandler(e, setKidUserName)} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Kid Password</Form.Label>
            <Form.Control
                type="password"
                value={kidPW}
                name="kid-password"
                placeholder="Enter Your Kiddo's Temporary Password"
                onChange={(e) => onChangeHandler(e, setKidPW)} 
            />
            </Form.Group>
            <Button variant="primary" type="submit">
            Create a New Kiddo
            </Button>
        </Form>
    </div>
  );
};

export default NewKid;