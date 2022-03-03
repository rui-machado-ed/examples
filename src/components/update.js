import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import MockAPI from '../config/config';
import { useNavigate } from 'react-router-dom';

// useState allows us to capture element state/value 
// we call onChange={(e) => setField(e.target.value)} to set changed value
// axios can be use to make API calls

export default function Update() {

    let navigate = useNavigate();

    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    

    const updateAPIData = () => {

        var isTrueSet = (checkbox === true);


        console.log(firstName);
        console.log(lastName);
        console.log(isTrueSet);

        //Call mockAPI
        axios.put(MockAPI.URL + `/${id}`, {
            firstName,
            lastName,
            isTrueSet
        }).then(() => {
            navigate("/read");
        })
        
    }

  
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setCheckbox(localStorage.getItem('Checkbox Value'))
    }, []);

    return(
        <div>
            <Form className='create-form'>
                <Form.Group className="mb-3" controlId="formBasicFirst">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLast">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)}  type="text" placeholder="Last Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check checked={checkbox} type="checkbox" onChange={(e) => setCheckbox(!checkbox)} label="Accept terms and conditions" />
                </Form.Group>
                <Button onClick={updateAPIData} variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

