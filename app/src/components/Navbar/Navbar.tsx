import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Requests, { Url } from "../../requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";
//these are the icons used in navbar
import {GiHamburgerMenu} from "react-icons/gi";
import {FaRegWindowClose} from "react-icons/fa";

const Navbar = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [username, setUsername] = useState<string>("");

  //this is for the current state of navbar
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  Requests.auth().then(res => {
    setVerified(res.isVerified)
    if (verified){
      setUsername(res.data.username);
    } 
  });

// this is to get the navbar DOM-element from the jsx below
const toggle = document.querySelector(".navbar")

// this is for toggling the navbar
if(isOpen) {
  toggle?.classList.remove("closeNav")
  toggle?.classList.add("activeNav")
} else {
  toggle?.classList.add("closeNav")
  toggle?.classList.remove("activeNav")
}


const handleLogout = async () => {
  await Requests.getWithCredentials(Url.AUTH, "logout");
  window.location.reload();
}

const Username = () => {
  if(username === "") return null;
  return (
    <h3 className="navbarUsername">
        <Link to="/profile" className="link">{username}</Link>
    </h3> 
  )
};

const Logout = () => {
  if(!verified) {
    return (
        <Link to="/login" className="link">Login</Link>
    )
  }
  return (
    <p className="link" onClick={handleLogout}>logout</p>
  )
}

useEffect( () => {
},[verified])

return (
  <Router>
    <div className="topBar">
      <GiHamburgerMenu 
        className="toggle"
        onClick={()=>{setIsOpen(!isOpen)}}
      />
      <h1 className="logo">Look-Book </h1>
    </div>
    <div className="navbar">
      <FaRegWindowClose
        className="toggleClose" 
        onClick={()=>{setIsOpen(!isOpen)}}
        color="white"
      />
      <Username/>

      <div className="navItems">
        <Searchbar />

        <ul className="linkBox">
          <li className="navLink" >
            <Link to="/" className="link">Explore</Link>
          </li>
          <li className="navLink">
            <Link to="/feeds" className="link">Feeds</Link>
          </li>
          <li className="navLink" >
            <Logout />
          </li>
        </ul>
      </div>
    </div>
    <NavRouter />
  </Router>
)
}

export default Navbar;
