import axios from "axios";
import React, {useState} from "react";
import {useCookies} from "react-cookie";

const Login = () => {
  // also have to make a signup page
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cookie, setCookie] = useCookies(['authToken']);

  const handleIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const loginAction = async() => {
    await axios.post("http://localhost:8000/login" , {
      identifier, 
      password
    }).then((res) => {
      setCookie("authToken", res.data.accessToken);
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginAction();
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
