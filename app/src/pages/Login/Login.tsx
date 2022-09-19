import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Auth from "../../Requests/Auth";
import Requests from "../../Requests/Requests";

const Login = () => {

  const [verified, setVerified] = useState<Boolean>(false);
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  Auth().then(res => setVerified(res));

  const handleIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  }

 const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const loginAction = async() => {
    await Requests.post("http://localhost:8000/login" , {
      identifier, 
      password
    });
  }  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginAction();
    window.location.reload();
  }
  
  if(verified) return (<Redirect to="/feeds" />);

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
