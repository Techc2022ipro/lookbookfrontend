import React, { useState } from "react"
import {Link} from "react-router-dom";
import Button from "../customHtmlComponents/Button/Button";

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

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Look-Book</h1>
        <div className="login-input-div">
          <div className="login-input-field">
            <label className="login-input-title">
              Username
            </label>
            <input
              type="text"
              onChange={handleUsername}
              value={username}
              className="login-input"
            />
          </div>
          <div className="login-input-field">
            <label className="login-input-title">
              Email
            </label>
            <input
              type="email"
              onChange={handleEmail}
              value={email}
              className="login-input"
            />
          </div>
          <div className="login-input-field">
            <label className="login-input-title">
              Password
            </label>
            <input
              type="password"
              onChange={handlePassword}
              value={password}
              className="login-input"
            />
          </div>
          <div className="login-input-field">
            <label className="login-input-title">
              Confirm-Password
            </label>
            <input
              type="password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              className="login-input"
            />
          </div>
        </div>
        <Button type="submit" value="Signup" class="primaryBtn" />
        <p>Dont have an account? <Link to="/login" className="form-link">Login</Link></p>
      </form>
    </div>
  )
}
export default Signup
