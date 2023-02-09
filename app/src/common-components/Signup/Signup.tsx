import React, { useState } from "react"
import {Link} from "react-router-dom";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import Button from "../customHtmlComponents/Button/Button";
import Requests, { Url } from "../../requests/Requests";

const Signup = ()=>{
  const [username,setUsername]=useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [confirmPassword,setConfirmPassword]=useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

  const signupAction = async() => {
    const signup = await Requests.post(Url.AUTH, '/signup', {
      username,
      email,
      password,
      confirmPassword,
    });
    setIsLoading(true);
    if(!signup.data) {
      setIsLoading(false);
      setError(signup.response.data.error);
    }

    if(signup.data) {
      setIsLoading(false);
      setMessage(signup.data.message)
    }
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signupAction();
  }

  if(isLoading) return <IsLoading />;

  const Message = () => {
    if(message) {
      return (
        <p className="message-banner">
          <strong onClick={()=>{setMessage(null);}} className="close-banner">x</strong>
          {message}
        </p> 
      )
    }
    return null;
  }


  const Error = () => {
    if(error) {
    return(
      <p className="warning-banner">
        <strong onClick={()=>{setError(null);}} className="close-banner">x</strong>  
        {error}
      </p> 
    )
  }
  return null;
  }


  return (
    <div className="form-section">
      <Error />
      <Message />
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
