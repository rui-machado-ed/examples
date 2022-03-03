import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import MockAPI from '../config/config';
import { useNavigate } from 'react-router-dom';

// useState allows us to capture element state/value 
// we call onChange={(e) => setField(e.target.value)} to set changed value
// axios can be use to make API calls

export default function Create() {

    let navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    
    const postData = () => {

        console.log(firstName);
        console.log(lastName);
        console.log(checkbox);

        //Call mockAPI
        axios.post(MockAPI.URL, {
            firstName,
            lastName,
            checkbox
        }).then(() => {
            navigate('/read');
        })
    }

    return(
        <div>
            <Form className='create-form'>
                <Form.Group className="mb-3" controlId="formBasicFirst">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLast">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={(e) => setLastName(e.target.value)}  type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={(e) => setCheckbox(!checkbox)} label="Accept terms and conditions" />
                </Form.Group>
                <Button onClick={postData} variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

