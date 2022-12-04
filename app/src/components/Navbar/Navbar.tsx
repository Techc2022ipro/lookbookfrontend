import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Requests, { Url } from "../../requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaRegWindowClose} from "react-icons/fa";


const Navbar = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [username, setUsername] = useState(null);
  const [search, setSearch] = useState<string>("type");
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  Requests.auth().then(res => {
    setVerified(res.isVerified)
    if (verified) setUsername(res.data.username)
  });

const toggle = document.querySelector(".navbar")

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

return (
  <Router>
    <div className="topBar">
      <GiHamburgerMenu 
        className="toggle"
        onClick={()=>{setIsOpen(!isOpen)}}
      />
      <h1 className="logo">Look-Book </h1>
    </div>
    {
      username ? username : null
    }
    <div className="navbar">
      <FaRegWindowClose
        className="toggleClose" 
        onClick={()=>{setIsOpen(!isOpen)}}
        color="white"
      />
      <div className="navItems">
        <Searchbar
          slug={search}
        />

        <ul className="linkBox">
          <li className="navLink" >
            <Link to="/" className="link">Explore</Link>
          </li>
          <li className="navLink">
            <Link to="/feeds" className="link">Feeds</Link>
          </li>

          {
            verified ?
              <button onClick={handleLogout} >logout</button>
              :
              <li className="navLink" >
                <Link to="/login" className="link">Login</Link>
              </li>
          }
        </ul>
      </div>
    </div>

    <NavRouter />
  </Router>
)
}

export default Navbar;
