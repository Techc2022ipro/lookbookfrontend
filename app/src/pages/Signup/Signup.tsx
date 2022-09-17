import React, { useState } from "react"
import Requests from "../../Requests/Requests";

const Signup = ()=>{
  const [username,setUsername]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [confirmPassword,setConfirmPassword]=useState<string>("");

  const handleUsername=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value);
  }
  const handleEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value);
  }
  const handlePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
  }
  const handleConfirmPassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setConfirmPassword(e.target.value);
  }

  const signupAction=async()=>{
    const sinupResponse=await Requests.post('http://localhost:8000/signup',{
      username,
      email,
      password,
      confirmPassword,
    });
    console.log(sinupResponse);
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signupAction();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your username" onChange={handleUsername} value={username}/>
      <input type="email" placeholder="Enter your email" onChange={handleEmail} value={email}/>
      <input type="password" placeholder="Enter your password" onChange={handlePassword} value={password}/>
      <input type="password" placeholder="Enter confirm password" onChange={handleConfirmPassword} value={confirmPassword}/>
      <button type="submit">
        signup
      </button>
    </form>
  )

}
export default Signup
