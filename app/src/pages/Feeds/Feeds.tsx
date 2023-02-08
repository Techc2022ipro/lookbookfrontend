import Login from "../../common-components/Login/Login";
import {isVerified} from "../../libs/Verified";

const Feeds = () => {
  if(!isVerified()) {
    return (<Login />)
  }

  return (
    <div>
    </div>
  )
}

export default Feeds;
