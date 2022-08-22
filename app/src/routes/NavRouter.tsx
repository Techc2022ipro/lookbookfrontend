import {Route, Switch} from "react-router-dom"
import Explore from "../pages/Explore/Explore";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/products" component={Products} />
    </Switch>
  )
} 

export default NavRouter;
