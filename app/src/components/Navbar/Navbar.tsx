import { BrowserRouter as Router, Link } from "react-router-dom";
import NavRouter from "../../routes/NavRouter";
import Searchbar from "../SearchBar/Searchbar";

const Navbar = () => {
  return (
    <Router>      
      <div className="navbar">
      <h2 className="logo">Lookbook</h2>
      <ul className="navLinks">
        <Searchbar />
        <li className="navLink">
          <Link to = "/">Home</Link>
        </li>

        <li className="navLink">
          <Link to = "/explore">Explore</Link>
        </li>

        <li className="navLink">
          <Link to = "/products">Products</Link>
        </li>

        <li className="navLink">
          <Link to = "/login">Login</Link>
        </li>
      </ul>
    </div>
      <NavRouter />
    </Router>
  )
}

export default Navbar;
