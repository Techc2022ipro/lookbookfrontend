import {Route, Switch} from "react-router-dom"
import Explore from "../pages/Explore/Explore";
import Feeds from "../pages/Feeds/Feeds";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Explore} />
      <Route path="/feeds" component={Feeds} />
      <Route path="/login" component={Login} />
      <Route path="/Signup" component={Signup} />
    </Switch>
  )
} 

export default NavRouter;
