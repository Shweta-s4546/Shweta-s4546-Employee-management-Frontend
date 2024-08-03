import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/employee/getAll');
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/employee/delete/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
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
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav me-auto text-uppercase mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-employee">Create Employee</Link>
          </li>
        </ul>
        <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
      </div>

      
    </nav>
    <h4 className="mb-4 mt-4 text-uppercase">Employee List</h4>
      {/* <div className="mb-3">
      <Link to="/dashboard" className="btn btn-secondary">Home</Link>
        <Link to="/add-employee" className="btn btn-primary me-4">Create Employee</Link>
        
      </div> */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
               <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>Gender</th>
              <th>Designation</th>
              <th>Created_date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                 <td>
                  {employee.image && (
                    <img 
                      src={`http://localhost:4000/${employee.image}`} 
                      alt={`${employee.name}'s profile`} 
                      style={{width: '50px', height: '50px', objectFit: 'cover'}}
                    />
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.course}</td>
                <td>{employee.gender}</td>
                <td>{employee.designation}</td>
                <td>{employee.create_date}</td>
                <td>
                <Link to={`/add-employee/${employee._id}`}
                   className="btn btn-sm btn-outline-primary me-2"
                        >
                        Edit
                        </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default EmployeeList;