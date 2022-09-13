import Cookies from "js-cookie";
import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import Requests from "../../Requests/Requests";

const Login = () => {
  // also have to make a signup page
  let history = useHistory();
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  if(Cookies.get("authToken")) return (<Redirect to="/feeds" />)

  const handleIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const loginAction = async() => {
    const setCookie = await Requests.post("http://localhost:8000/login" , {
      identifier, 
      password
    });
    Cookies.set("authToken", setCookie.accessToken);
    return setCookie;
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSetCookie = await loginAction();
    window.location.reload();
    if(isSetCookie) return (history.push("/feeds"));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"  placeholder="Enter your Email or Username" onChange={handleIdentifier} value={identifier} />
        <input type="password"  placeholder="Enter your Password" onChange={handlePassword} value={password} />
        <button type="submit" >Login</button>
      </form>
    </div>
  )
}

export default Login;
