import React, { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";


function StudentList() {


  const navigate = useNavigate();


  const [students, setStudents] = useState([]);



  // Get Students From Firebase
  const getStudents = async () => {


    const data = await getDocs(
      collection(db, "students")
    );


    const studentData = data.docs.map((doc)=>({

      ...doc.data(),

      id: doc.id

    }));


    setStudents(studentData);


  };




  useEffect(()=>{

    getStudents();

  },[]);




  // Delete Student

  const deleteStudent = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );


    if(confirmDelete){


      await deleteDoc(
        doc(db,"students",id)
      );


      alert("Student Deleted");


      getStudents();


    }


  };




  return (


    <div className="student-container">


      <h2>
        📋 Student Details
      </h2>



      <table>


        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Course</th>

            <th>Age</th>

            <th>Action</th>

          </tr>

        </thead>



        <tbody>


        {

          students.map((student)=>(


            <tr key={student.id}>


              <td>
                {student.name}
              </td>


              <td>
                {student.email}
              </td>


              <td>
                {student.course}
              </td>


              <td>
                {student.age}
              </td>


              <td>


                <button

                  onClick={()=>deleteStudent(student.id)}

                >

                  🗑 Delete

                </button>


              </td>



            </tr>


          ))

        }


        </tbody>


      </table>



      <button

        onClick={()=>navigate("/dashboard")}

      >

        ⬅ Back to Dashboard

      </button>



    </div>


  );


}


export default StudentList;