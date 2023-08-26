import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewPatient() {

    const [patient, setPatient] = useState({
        name: "",
        birthDate: "",
        weight: "",
        breed: "",
        color: "",
        sex: "",
        type: ""
    })

    const { id } = useParams();

    useEffect(() => {
        loadPatient();
    }, [])

    const loadPatient = async () => {
        const result = await axios.get(`http://localhost:8080/patients/${id}`);
        setPatient(result.data);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Patient Profile</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Details of patient id: {id}
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Name: </b>
                                    {patient.name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Species: </b>
                                    {patient.type}
                                </li>
                                <li className='list-group-item'>
                                    <b>Breed: </b>
                                    {patient.breed}
                                </li>
                                <li className='list-group-item'>
                                    <b>Sex: </b>
                                    {patient.sex}
                                </li>
                                <li className='list-group-item'>
                                    <b>Weight: </b>
                                    {patient.weight}
                                </li>
                                <li className='list-group-item'>
                                    <b>Color: </b>
                                    {patient.color}
                                </li>
                                <li className='list-group-item'>
                                    <b>Birth Date: </b>
                                    {patient.birthDate}
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={"/"}>Back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewPatient;