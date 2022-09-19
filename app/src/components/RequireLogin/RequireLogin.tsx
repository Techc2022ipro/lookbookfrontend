import {Link} from "react-router-dom";

const RequireLogin = () => {
  return (
    <div>
        <p>You are required to <Link to="/login">Login</Link> before u can view this page</p>
    </div>
  )
}
export default RequireLogin;
