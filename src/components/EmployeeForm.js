import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    gender: '',
    designation: '',
    create_date:''
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/employee/edit/${id}`);
      setFormData(response.data.employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
      if (error.response && error.response.status === 404) {
        setError('Employee not found');
      } else {
        setError('Error fetching employee');
      }
    }
  }, [id]);

  useEffect(() => {
    console.log("Current id:", id);
    if (id) {
      fetchEmployee();
    }
  }, [id, fetchEmployee]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`http://localhost:4000/api/employee/edit/${id}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/employee/add', formData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/logout');
      alert(response.data.message);
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };
  return (
    <div className="container-fluid">
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <ul className="navbar-nav me-auto text-uppercase  mb-2 mb-lg-0">
        <li className="nav-item">
            <Link className="nav-link text-dark" to="/dashboard">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/employees">Employees List</Link>
          </li>
        </ul>
        <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
      </div>
    </nav>

   
        {/* <h3 className="mb-4 mt-4">Dashboard</h3> */}
     
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center mb-4">{id ? 'Edit Employee' : 'Create Employee'}</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name"
                  value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email"
                  value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="mobile" name="mobile"
                  value={formData.mobile} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="course" className="form-label">Course</label>
                <input type="text" className="form-control" id="course" name="course"
                  value={formData.course} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="designation" className="form-label">Designation</label>
                <select type="text" className="form-select" id="designation" name="designation"
                  value={formData.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                  <option value="Male">HR</option>
                  <option value="Female">Manager</option>
                  <option value="Other">Developer</option>
                  <option value="Other">Other</option>
                  </select>
              </div>
              <div className="mb-3">
                <label className="form-label d-block">Gender</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="genderMale" value="Male"
                    checked={formData.gender === "Male"} onChange={handleChange} required  />
                    <label className="form-check-label" htmlFor="genderMale">
                    Male
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="Female"
                    checked={formData.gender === "Female"} onChange={handleChange} required/>
                    <label className="form-check-label" htmlFor="genderFemale">
                    Female
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender"  id="genderOther"  value="Other"
                    checked={formData.gender === "Other"} onChange={handleChange}  required  />
                    <label className="form-check-label" htmlFor="genderOther">
                    Other
                    </label>
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="date" className="form-label">Created_date</label>
                <input type="date" className="form-control" id="create_date" name="create_date"
                  value={formData.create_date} onChange={handleChange} required />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  {id ? 'Update Employee' : 'Submit'}
                </button>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
     
    
  );
}

export default EmployeeForm;