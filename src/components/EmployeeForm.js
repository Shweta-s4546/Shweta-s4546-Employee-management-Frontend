import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: [],
    gender: '',
    designation: '',
    create_date:'',
    image:null
  });

  const [previewImage, setPreviewImage] = useState(null); 
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/employee/edit/${id}`);
      const employeeData = response.data.employee;
      setFormData(response.data.employee);
      console.log('Fetched Employee Data:', employeeData);
      const courses = Array.isArray(employeeData.course)
      ? Array.from(new Set(employeeData.course))
      : employeeData.course ? [employeeData.course] : [];

                      setFormData({...employeeData, course: courses});
    } catch (error) {
      console.error('Error fetching employee:', error);
      // if (error.response && error.response.status === 404) {
      //   setError('Employee not found');
      // } else {
      //   setError('Error fetching employee');
      // }
    }
  }, [id]);

  useEffect(() => {
    console.log("Current id:", id);
    if (id) {
      fetchEmployee();
    }
  }, [id, fetchEmployee]);


  const courses = ['React', 'Nodejs', 'Mern', 'Java'];

const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    console.log(`Changed field: ${name}, value: ${value}, checked: ${checked}, type: ${type}`);

    if (type === 'checkbox') {
      setFormData((prevData) => {
        const updatedCourses = new Set(prevData.course);
        if (checked) {
          updatedCourses.add(value);
        } else {
          updatedCourses.delete(value);
        }
        return { ...prevData, course: Array.from(updatedCourses) };
      });
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formDataToSend = new FormData();
        for (let key in formData) {
            if (key === 'image' && formData[key]) {
                formDataToSend.append(key, formData[key]);
              } else if (key === 'course') {
                // Join the course array into a string
                formDataToSend.append(key, formData[key].join(','));
              } else {
                formDataToSend.append(key, formData[key]);
              }
        }


        if (id) {
          await axios.patch(`http://localhost:4000/api/employee/edit/${id}`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for file uploads
            },
          });
        } else {
          await axios.post('http://localhost:4000/api/employee/add', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for file uploads
            },
          });
        }
        navigate('/employees');
    } catch (error) {
      // console.error('Error submitting form:', error);
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
              <label htmlFor="course" className="form-label">Courses</label>
              {courses.map((course, index) => (
                  <div key={index}>
                      <input
                          type="checkbox"
                          id={`course_${index}`}
                          name="course"
                          value={course}
                          onChange={handleChange}
                          checked={formData.course.includes(course)}
                      />
                      <label htmlFor={`course_${index}`} className="form-label">{course}</label>
                  </div>
              ))}
          </div>

              <div className="mb-3">
                <label htmlFor="designation" className="form-label">Designation</label>
                <select type="text" className="form-select" id="designation" name="designation"
                  value={formData.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
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
              <div className="mb-3">
                  <label htmlFor="image" className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>
                {previewImage && (
                  <div className="mb-3">
                    <img src={previewImage} alt="Preview" style={{ maxWidth: '200px' }} />
                  </div>
                )}

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