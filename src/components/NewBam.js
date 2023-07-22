// import the things we need
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';


// create component, pass props
const NewBam = ({handleNewBam}) => {

    // set up states
    const [bamData, setBamData] = useState({
        bamName: "",
        description: "",
        points: 0,
        dueDate: "",
        assignee: "Unassigned",
        completed: false,
        verified: false
      });
    const [myKids, setMyKids] = useState(null);
    const { bamName, description, points, dueDate, assignee} = bamData;
    const kidsURL = `https://fambam-backend.onrender.com/kids`;

    const fetchKidsData = async() => {
        try {
            let responseData = await fetch(kidsURL, {credentials: 'include'});
            let kidsData = await responseData.json();
            setMyKids(kidsData);
            console.log(kidsData);
        } catch (error) {
            console.log('Error fetching kids: ', error)
        }
    };

    useEffect(() => {
        fetchKidsData();
    },[]);

    // when typing into form
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setBamData({
        ...bamData,
        [name]: value,
        });
    };

    // when form is submitted
    const onSubmitHandler = async (e) => {
        // don't reload
        e.preventDefault();
        console.log("New Bam, yo: ", bamData);
        // and post
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(bamData),
            credentials: 'include'
        };
        try {
            const responseData = await fetch (`https://fambam-backend.onrender.com/bams`, options);
            if (responseData.ok) {
                const newBamObj = await responseData.json();
                console.log("newKidObj: " , newBamObj);
                handleNewBam(newBamObj);
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
                <Form.Label>Bam Name</Form.Label>
                <Form.Control
                    type="text"
                    value={bamName}
                    name="bamName"
                    placeholder="Enter Bam Name"
                    onChange={handleOnChange} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Bam Description</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                value={description}
                name="description"
                placeholder="Enter Bam Description"
                onChange={handleOnChange} 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Bam Points</Form.Label>
            <Form.Control
                type="number"
                pattern="[0-9]*"
                value={points}
                name="points"
                placeholder="Enter Bam points"
                onChange={handleOnChange} 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
                type="date"
                value={dueDate}
                name="dueDate"
                placeholder="Enter Bam Due Date"
                onChange={handleOnChange} 
            />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Assign Kid</Form.Label>
            <Form.Control 
                as="select"
                value={assignee}
                name="assignee"
                onChange={handleOnChange}
            >
                {myKids ? (
                    <>
                    <option value="Unassigned">Unassigned</option>
                    {myKids.map((kid) => (
                        <option key={kid._id} value={kid._id}>{kid.username}</option>
                      ))}
                    </>
                ) : (
                    <>
                    <option value="Unassigned">Unassigned</option>
                    </>
                )}
            </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create a New Bam
            </Button>
        </Form>
    </div>
  );
};

export default NewBam;