import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Userd() {

    const [usersData, setUsersData] = useState([]);
    const [user, setUser] = useState({})

    function fetchUsersData() {
        axios.get(`${import.meta.env.VITE_BASE_URL}users`)
            .then((res) => {
                console.log(res.data);
                setUsersData(res.data)
            })
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    function handleUpdate(id) {
        axios.get(`${import.meta.env.VITE_BASE_URL}users/${id}`)
            .then((res) => {
                console.log(res.data);
            })
    };

    function handleDelete(id) {
        // alert(id)
        // axios.delete(`${import.meta.env.VITE_BASE_URL}users/${id}`)
        axios.delete("http://localhost:8080/users/" + id)
            .then((res) => {
                console.log(res.data);
                fetchUsersData();
            })
    };

    return (
        <div>
            {/* <!-- Table 2 - Bootstrap Brain Component --> */}
            <section className="py-3 py-md-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9 col-xl-8">
                            <div className="card widget-card border-light shadow-sm">
                                <div className="card-body p-4">
                                    <h5 className="card-title widget-card-title mb-4">Users List</h5>
                                    <div className="table-responsive">
                                        <table className="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Eamil</th>
                                                    <th>Mobile</th>
                                                    <th>Password</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    usersData.map((eachData, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="fs-6 bsb-w-35 bsb-h-35 text-bg-primary rounded-circle d-flex align-items-center justify-content-center me-2">
                                                                            <i className="bi bi-twitter-x"></i>
                                                                        </span>
                                                                        <div>
                                                                            <h6 className="m-0">{eachData.name}</h6>
                                                                            {/* <span className="text-secondary fs-7">SMM</span> */}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1">{eachData.email}</h6>
                                                                    <span className="text-secondary fs-7">United States</span>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1">{eachData.mobile}</h6>
                                                                    <span className="text-secondary fs-7">v5.3+</span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-danger bsb-w-85">{eachData.password}</span>
                                                                </td>
                                                                <td>
                                                                    <Link to={"/users/" + eachData.id}>
                                                                        <button className='btn btn-primary m-1'>Edit</button>
                                                                    </Link>
                                                                    <button onClick={() => handleDelete(eachData.id)} className='btn btn-danger'>Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
