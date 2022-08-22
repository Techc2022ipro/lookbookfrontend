import {Route, Switch} from "react-router-dom"
import Explore from "../pages/Explore/Explore";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/explore">
        <Explore />
      </Route>
    </Switch>
  )
} 

export default NavRouter;
