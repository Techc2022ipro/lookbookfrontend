import {Route, Switch} from "react-router-dom"
import Login from "../common-components/Login/Login";
import Signup from "../common-components/Signup/Signup";
import Explore from "../pages/Explore/Explore";
import Feeds from "../pages/Feeds/Feeds";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Explore} />
      <Route path="/feeds" component={Feeds} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  )
} 

export default NavRouter;
