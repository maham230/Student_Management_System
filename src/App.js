import AddManyStudents from "./pages/AddManyStudents";
import ViewStudent from "./pages/ViewStudent";
import UpdateStudent from "./pages/UpdateStudent";
import DeleteStudent from "./pages/DeleteStudent";
import AddStudent from "./pages/AddStudent";
import FindStudent from "./pages/FindStudent";
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import dbx from "./dropbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import "./App.css";


function App() {


  return (

    <BrowserRouter>

      <Routes>


        {/* Login Page */}
        <Route 
          path="/" 
          element={<Login />} 
        />


        {/* Register Page */}
        <Route 
          path="/register" 
          element={<Register />} 
        />


        {/* Dashboard */}
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />


        {/* Add Student */}
        <Route 
          path="/add" 
          element={<StudentForm />} 
        />


        {/* View Students */}
        <Route 
          path="/view" 
          element={<StudentList />} 
        />
        <Route
  path="/add-student"
  element={<AddStudent />}
/>
        <Route
  path="/add-many-students"
  element={<AddManyStudents />}
/>

<Route
  path="/view-student"
  element={<ViewStudent />}
/>

<Route
  path="/find-student"
  element={<FindStudent />}
/>

<Route
  path="/update-student"
  element={<UpdateStudent />}
/>

<Route
  path="/delete-student"
  element={<DeleteStudent />}
/>


      </Routes>

    </BrowserRouter>

  );

}


export default App;