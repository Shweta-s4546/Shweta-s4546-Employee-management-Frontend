import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/admin/registers', { name, email, password });
      alert(response.data.message);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  return (

    <div className='container align-items-center'>
      <div className="row mt-5">
        <div className="col-md-8 col-sm-12 col-md-2 offset-md-2 offset-lg-2">
          <div className="card">
            <div className="card-body p-0" id='auth'>
              <div className="row">

              <div className="col-md-6 col-lg-6 col-sm-12 bg-success p-5 p-sm-4 text-center " id='content'>
                  <div className="title">
                    <h5 className="display-5 text-light">Welcome Back!<br/> User</h5>
                  </div>
                  <div className="content">
                    <p className="text-light">
                      To keep connected with usplease login
                    </p>
                  </div>
                  <NavLink to={`/login`} className="btn btn-outline-light">login</NavLink>
                </div>

                <div className="col-md-6 col-lg-6 col-sm-12 p-5 bg-light text-center">
                  <div className="title">
                    <h5 className="display-5 text-success">Register</h5>
                  </div>
                  <form autoComplete='off'onSubmit={handleRegister}>
                  <div className="form-group mt-4">
                      <input type="text" name="name"placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="form-group mt-2">
                      <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="form-group mt-2">
                      <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group mt-2">
                      <input type="submit" value="Register" className='btn btn-success' />
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Register;