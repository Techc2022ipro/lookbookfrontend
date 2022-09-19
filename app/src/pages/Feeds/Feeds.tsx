import {useEffect, useState} from "react";
import Requests from "../../Requests/Requests";
import Auth from "../../Requests/Auth";
import RequireLogin from "../../components/RequireLogin/RequireLogin";

const Feeds = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [userFeeds, setUserFeeds] = useState(null);

  Auth().then(res => setVerified(res));

  const fetchData = async () => {
      const userFeeds = await Requests.getWithCredentials("http://localhost:2000/feeds");
      setUserFeeds(userFeeds);
  }

  useEffect(() => {
    if(verified) fetchData();
  }, [verified]);


  return (
    <div>
      {
      verified ?
        userFeeds
      :
        <RequireLogin />
      }
    </div>
  )
}

export default Feeds;
