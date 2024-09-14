
import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';
import Users from './Users';
import { Link, useParams } from 'react-router-dom';

function Create() {

  let { id } = useParams();

  // console.log(process.env.REACT_APP_BASE_URL);
  // console.log(import.meta.env.VITE_BASE_URL);

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
    // console.log(data);
  };

  function handleSubmit() {
    // console.log(data);
    if (id === undefined) {
      axios.post(`${import.meta.env.VITE_BASE_URL}users`, data)
        .then((res) => {
          console.log(res.data);
          setData({
            name: "",
            email: "",
            mobile: "",
            password: ""
          })
        })
    } else {
      // alert(id)
      axios.put(`${import.meta.env.VITE_BASE_URL}users/${id}`, data)
        .then((res) => {
          console.log(res.data);
          setData({
            name: "",
            email: "",
            mobile: "",
            password: ""
          })
        })
    }

  };

  useEffect(() => {
    if (id) {
      axios.get(`${import.meta.env.VITE_BASE_URL}users/${id}`)
        .then((res) => {
          console.log(res.data[0]);
          let data = res.data[0];
          setData({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            password: data.password
          })
        })
    }
  }, [])

  return (
    <>
      <section className="bg-light py-3 py-md-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <a href="#!">
                      <img src="https://igaptechnologies.com/assets/images/logo.png" alt="BootstrapBrain Logo" width="175" height="57" />
                    </a>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>

                  <Link to={"/users"}>
                    <button className='me btn btn-primary mb-2'>Users</button>
                  </Link>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} type="text" className="form-control" name="name" id="name" value={data.name} placeholder="First Name" required />
                        <label htmlFor="name" className="form-label">Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} type="email" className="form-control" name="email" id="email" placeholder="Email" value={data.email} required />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} type="mobile" className="form-control" name="mobile" id="mobile" placeholder="Mobile" value={data.mobile} required />
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} type="password" className="form-control" name="password" id="password" placeholder="Password" value={data.password} required />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="iAgree" id="iAgree" required />
                        <label className="form-check-label text-secondary" htmlFor="iAgree">
                          I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary btn-lg" type="submit">Submit</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Create;