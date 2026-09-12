import React, {useState} from "react";

import {
createUserWithEmailAndPassword
}
from "firebase/auth";

import {auth} from "../firebase";


function Register(){

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



const register = async()=>{

try{

await createUserWithEmailAndPassword(
auth,
email,
password
);


alert("Registration Successful");


window.location.href="/";


}

catch(error){

alert(error.message);

}


}



return(

<div className="login-box">


<h2>
Create Account
</h2>


<input

type="email"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>


<input

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>


<button onClick={register}>
Register
</button>


</div>


)

}


export default Register;