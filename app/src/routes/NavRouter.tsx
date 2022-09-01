import {Route, Switch} from "react-router-dom"
import Explore from "../pages/Explore/Explore";
import Feeds from "../pages/Feeds/Feeds";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Explore} />
      <Route path="/feeds" component={Feeds} />
      <Route path="/products" component={Products} />
      <Route path="/login" component={Login} />
    </Switch>
  )
} 

export default NavRouter;
