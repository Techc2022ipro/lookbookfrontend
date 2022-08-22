import {Route, Switch} from "react-router-dom"
import Explore from "../pages/Explore/Explore";
import Products from "../pages/Products/Products";

const NavRouter = () => {
  return (
    <Switch>
      <Route path="/explore">
        <Explore />
      </Route>

      <Route path="/products">
        <Products />
      </Route>

    </Switch>
  )
} 

export default NavRouter;
