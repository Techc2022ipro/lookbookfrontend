import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import Explore from "../screens/Explore/Explore";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/"><App /></Route>
        <Route path="/"><Explore /></Route>
      </Switch>
    </Router>
  )
}

export default Routes;
