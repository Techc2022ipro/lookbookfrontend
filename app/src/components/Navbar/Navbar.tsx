import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Requests, { Url } from "../../requests/Requests";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";

const Navbar = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [username, setUsername] = useState(null);
  const [search, setSearch] = useState<string>("type");

  useEffect(() => {
    Requests.auth().then(res => {
      setVerified(res.isVerified)
      if (verified) setUsername(res.data.username)
    });
  }, [verified])

  const handleLogout = async () => {
    await Requests.getWithCredentials(Url.AUTH, "logout");
    window.location.reload();
  }


  return (
    <Router>
      {
        username ? username : null
      }
      <div className="navbar">
        <div className="navItems">
          <Searchbar
            slug={search}
          />
          <div className="filters">
          <input
            type="button"
            value="name"
            className="filterButton"
            onClick={() => {
              setSearch("name");
            }}
          />

          <input
            type="button"
            value="type"
            className="filterButton"
            onClick={() => {
              setSearch("type");
            }}
          />
          </div>

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
