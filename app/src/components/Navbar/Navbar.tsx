import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Requests from "../../Requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";

const Navbar = () => {
  const [username, setUsername] = useState(null);

  const fetchData = async () => {
    if(Cookies.get("authToken")) {
      const productData = await Requests.getWithCredentials("http://localhost:2000/getCreds");
      setUsername(productData.username);
    } 
  }
  useEffect(() => {
    fetchData();
  },[])
  const handleLogout = () => {
    Cookies.remove("authToken");
    window.location.reload();
    return (<Redirect to="/login" />)
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
        <li className="navLink">
          {username ?
          <Link to = "/logout" onClick={handleLogout}>logout</Link>
          :
          <>
          <Link to = "/login">Login</Link>
            /
          <Link to = "/signup">Signup</Link>
          </>
          }
        </li>
      </ul>
    </div>
      <NavRouter />
    </Router>
  )
}

export default Navbar;
