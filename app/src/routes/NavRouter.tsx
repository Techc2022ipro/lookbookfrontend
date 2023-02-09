import {Route, Switch} from "react-router-dom"
import Login from "../common-components/Login/Login";
import Signup from "../common-components/Signup/Signup";
import Explore from "../pages/Explore/Explore";
import Feeds from "../pages/Feeds/Feeds";
import Product from "../pages/Product/Product";
import Profile from "../pages/Profile/Profile";
import Tags from "../pages/Tags/Tags";

const NavRouter = () => {

  return (
    <Switch>
      <Route exact path="/" component={Explore} />
      <Route path="/feeds" component={Feeds} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/tag/:slug" component={Tags} />
      <Route path="/product/:pid" component={Product} />
    </Switch>
  )
} 

export default NavRouter;
