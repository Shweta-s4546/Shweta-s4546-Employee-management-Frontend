import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/admin/login', { email, password });
      alert(response.data.message);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className='container align-items-center'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h6 className="display-6 text-success">Login page</h6>
            </div>
        </div>
    <div className="row mt-5">
      <div className="col-md-8 col-sm-12 col-md-2 offset-md-2 offset-lg-2">
        <div className="card">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 p-5 bg-light text-center">
                <div className="title">
                  <h5 className="display-5 text-success">Login</h5>
                </div>
                <form autoComplete='off' onSubmit={handleLogin}>
                  <div className="form-group mt-4">
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="form-group mt-2">
                    <input type="password" name="password"value={password} onChange={(e) => setPassword(e.target.value)} required  />
                  </div>
                  <div className="form-group mt-2">
                  <button type="submit">Login</button>
                  </div>
                </form>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 bg-success p-5 text-center" id='content'>
                <div className="title">
                  <h5 className="display-5 text-light">Hello,<br/> User</h5>
                </div>
                <div className="content">
                  <p className="text-light">
                    Enter your personal details to Start Journey with us
                  </p>
                </div>
                <NavLink to={`/register`} className="btn btn-outline-light">Register</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   
  );
}

export default Login;