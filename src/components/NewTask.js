// import the things we need
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

// create component, pass props
const NewTask = ({handleNewTask}) => {

    // set up states
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [kids, setKids] = useState(null);

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    };
    // when form is submitted
    const onSubmitHandler = async (e) => {
        // don't reload
        e.preventDefault();
        const newTask = {
            taskName: taskName,
            taskDesc: taskDesc
        };
        console.log("New Task, yo: ", newTask);
        // set the new household state
        setTaskName('');
        setTaskDesc('');
        // and post
        // const options = {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newTask),
        //     credentials: 'include'
        // };
        // try {
        //     const responseData = await fetch (`http://localhost:4000/household`, options);
        //     if (responseData.ok) {
        //     const newHHObj = await responseData.json();
        //     console.log("newHHObj: " , newHHObj);
        //     handleNewTask();
        //     } else {
        //     console.log('Failed to create household', responseData.status);
        //     }
        // } catch (error) {
        //     console.log('Error: ', error);
        // }
    }

    useEffect(() => {
        //get kids
        //setKids
    });

  // new household form
  return (
    <div>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                    type="text"
                    value={taskName}
                    name="task-name"
                    placeholder="Enter Task Name"
                    onChange={(e) => onChangeHandler(e, setTaskName)} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
                type="text"
                value={taskDesc}
                name="task-desc"
                placeholder="Enter Description"
                onChange={(e) => onChangeHandler(e, setTaskDesc)} 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Assign Kid</Form.Label>
            <Form.Select aria-label="Default select">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
            Create a New Task
            </Button>
        </Form>
    </div>
  );
};

export default NewTask;