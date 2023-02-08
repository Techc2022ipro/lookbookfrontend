import React, {useState} from "react";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import {Link, Redirect} from "react-router-dom";
import {isVerified, Verified} from "../../libs/Verified";
import Requests, {Url} from "../../requests/Requests";
import Button from "../customHtmlComponents/Button/Button";

const Login = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleIdentifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  }

 const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const loginAction = async() => {
    const login = await Requests.post(Url.AUTH, "/login", {
      identifier,
      password
    });
    setIsLoading(true);
    if(!login.data) {
      setError(login.message)
    };

    if(login.data) {
      sessionStorage.setItem("username", login.data.username);
      sessionStorage.setItem("uid", login.data.uid);
      setIsLoading(false);
    }

      const profile = await Requests.getWithCredentials(Url.AUTH, `/profile/${login.data.uid}`)
      setIsLoading(true)
      if(!profile.data) {
        setError('User Profile is not set');
        setIsLoading(false);
      }
      if(profile.data) {
        sessionStorage.setItem('profilePic', profile.data.profilePic);
        setIsLoading(false);
      }
    window.location.reload();
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginAction();
  }

  if(isLoading) return (<IsLoading />);

  if(isVerified()) {
    return (<Redirect to={"/"} />);
  }

return (
    <div className="form-section">
        {error ? <p className="error">wrong username/password</p>: null}
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Look-Book</h1>
        <div className="login-input-div">
          <div className="login-input-field">
            <label className="login-input-title">
              Username or Email
            </label>
            <input 
              type="text"  
              onChange={handleIdentifier} 
              value={identifier} 
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
            <Link to="/" className="form-link">Forgot Password?</Link>
          </div>
        </div>
        <Button type="submit" value="Login" class="primaryBtn" />
        <p>Dont have an account? <Link to="/signup" className="form-link">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login;
