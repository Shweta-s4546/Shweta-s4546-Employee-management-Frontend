import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              localStorage.getItem('isLoggedIn') ? <Dashboard /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/employees" 
            element={
              localStorage.getItem('isLoggedIn') ? <EmployeeList /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/add-employee" 
            element={
              localStorage.getItem('isLoggedIn') ? <EmployeeForm /> : <Navigate to="/login" />
            } 
          />
           <Route 
            path="/add-employee/:id" 
            element={
              localStorage.getItem('isLoggedIn') ? <EmployeeForm /> : <Navigate to="/login" />
            } 
          />
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;