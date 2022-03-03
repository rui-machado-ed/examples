import React, {useEffect, useState} from 'react';
import { Table, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import MockAPI from '../config/config';


export default function Read() {

    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get(MockAPI.URL)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const getData = () => {
        axios.get(MockAPI.URL)
            .then((getData) => {
                 setAPIData(getData.data);
             })
    }

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
        console.log(data);
     }

    const onDelete = (id) => {
        axios.delete(MockAPI.URL + `/${id}`).then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Checked</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {APIData.map((data) => {
                        return (
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.checkbox ? 'Checked' : 'Unchecked'}</td>
                            <Link to='/update'>
                                <td>                                 
                                    <Button onClick={() => setData(data)}>
                                        Update                                   
                                    </Button>                                
                                </td>
                            </Link> 
                            <td>
                                <Button onClick={() => onDelete(data.id)}>Delete</Button>
                            </td>          
                        </tr>
                    )})}
                 
                </tbody>
                </Table>
        </div>
    )
}