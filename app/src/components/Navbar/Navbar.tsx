import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Requests, { Url } from "../../requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaRegWindowClose} from "react-icons/fa";
import Image from "../../common-components/Image/Image";

const Navbar = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");

  //this is for the current state of navbar
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  Requests.auth().then(res => {
    setVerified(res.isVerified)
    if (verified) {
      setUsername(res.data.username);
    }
  });
  const Username = () => {
    if (username === "") return null;
    return (
      <h3 className="navbarUsername">
        <Link to="/profile" className="link">{username}</Link>
      </h3>
    )
  };

  //get profile pic
  const getProfilePic = async() => {
    const profile = await Requests.getWithCredentials(Url.AUTH, "profile");
    setProfilePic(profile.profilePic)
  }



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
    window.location.reload();
  }

  const VerifiedNavbar = () => {
    if (verified) {
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

  const VerifiedSearchBar = () => {
    if (verified) {
      return <Searchbar />
    }
    return null;
  }

  useEffect(() => {
    getProfilePic()
  }, [])

  const ProfilePic = () => {
    if(!profilePic) {
      return(
        null
      )
    }
    return (
      <div className = "navbar-profile-pic">
        <Image class="nav-profile-pic" image={profilePic} />
      </div>
    )
  }

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
        <ProfilePic />
        <Username />
          <VerifiedSearchBar />

          <ul className="linkBox">
            <li className="navLink" >
              <Link to="/" className="link">Explore</Link>
            </li>
            <li className="navLink">
              <Link to="/feeds" className="link">Feeds</Link>
            </li>
            <VerifiedNavbar />
          </ul>
        </div>
      </div>
      <NavRouter />
    </Router>
  )
}

export default Navbar;
