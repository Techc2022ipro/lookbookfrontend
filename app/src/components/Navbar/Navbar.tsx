import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NavRouter from "../../routes/NavRouter";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaRegWindowClose} from "react-icons/fa";
import {isVerified, logout} from "../../libs/Verified";
import Requests, {Url} from "../../requests/Requests";

const Navbar = () => {

  //this is for the current state of navbar
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  // this is to get the navbar DOM-element from the jsx below
  const toggle = document.querySelector(".navbar")

  // this is for toggling the navbar
  if (isOpen) {
    toggle?.classList.remove("closeNav")
    toggle?.classList.add("activeNav")
  } else {
    toggle?.classList.add("closeNav")
    toggle?.classList.remove("activeNav")
  }

   const handleLogout = async () => {
    await Requests.getWithCredentials(Url.AUTH, "logout");
    logout();
    window.location.reload();
  }

  const VerifiedNavLinks = () => {
    if(isVerified()) {
      return (
        <>
            <li className="navLink">
            <Link to="/profile" className="link">Profile</Link>
          </li>

          <p className="link" onClick={handleLogout} >logout</p>
        </>
      )
    }
      return (
      <li className="navLink" >
        <Link to="/login" className="link">Login</Link>
      </li>
    )
  }
  useEffect(() => {
  }, [])

  return (
    <Router>
      <div className="topBar">
        <GiHamburgerMenu
          className="toggle"
          onClick={() => { setIsOpen(!isOpen) }}
        />
        <h1 className="logo">Look-Book </h1>
      </div>
      <div className="navbar">
        <FaRegWindowClose
          className="toggleClose"
          onClick={() => { setIsOpen(!isOpen) }}
          color="white"
        />

        <div className="navItems">

          <ul className="linkBox">
            <li className="navLink" >
              <Link to="/" className="link">Explore</Link>
            </li>
            <li className="navLink">
              <Link to="/feeds" className="link">Feeds</Link>
            </li>
            <VerifiedNavLinks />
          </ul>
        </div>
      </div>
      <NavRouter />
    </Router>
  )
}

export default Navbar;
