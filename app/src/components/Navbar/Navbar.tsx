import {useEffect, useState} from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Requests from "../../Requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";

const Navbar = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [username, setUsername] = useState(null);


  useEffect(() => {
    Requests.auth().then(res => {
      setVerified(res.isVerified)
      if(verified) setUsername(res.data.username)
    });
  },[verified])

  const handleLogout = async () => {
    await Requests.getWithCredentials("http://localhost:8000/logout");
    window.location.reload();
  }
  return (
    <Router>      
      {
        username ? username : null
      }
      <div className="navbar">
      <h2 className="logo">Lookbook</h2>
      <ul className="navLinks">
        <Searchbar />
        <li className="navLink">
          <Link to = "/">Explore</Link>
        </li>
        <li className="navLink">
          <Link to = "/feeds">Feeds</Link>
        </li>

        {
          verified ? 
          <button onClick={handleLogout}>logout</button>
          :
          <li className="navLink">
            <Link to = "/login">Login</Link>
              /
            <Link to = "/signup">Signup</Link>
          </li>
        }
      </ul>
    </div>
      <NavRouter />
    </Router>
  )
}

export default Navbar;
