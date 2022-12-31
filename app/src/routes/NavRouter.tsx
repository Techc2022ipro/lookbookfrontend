import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom"
import Login from "../common-components/Login/Login";
import Signup from "../common-components/Signup/Signup";
import Explore from "../pages/Explore/Explore";
import Feeds from "../pages/Feeds/Feeds";
import Profile from "../pages/Profile/Profile";
import Tags from "../pages/Tags/Tags";
import Requests from "../requests/Requests";

const NavRouter = () => {
  const [verified, setVerified] = useState<Boolean>(false);

  useEffect(() => {
    Requests.auth().then(res => setVerified(res.isVerified));
  },[verified])

  return (
    <Switch>
      <Route path="/" exact component={Explore} />
      <Route path="/feeds" component={()=> <Feeds verified={verified} />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={() => <Profile verified={verified} />} />
      <Route exact path="/tag/:slug" component={Tags} />
    </Switch>
  )
} 

export default NavRouter;
