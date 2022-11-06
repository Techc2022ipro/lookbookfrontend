import {useEffect, useState} from "react";
import Requests, {Url} from "../../Requests/Requests";
import RequireLogin from "../../components/RequireLogin/RequireLogin";

const Feeds = () => {
  const [verified, setVerified] = useState<Boolean>(false);
  const [userFeeds, setUserFeeds] = useState(null);


  const fetchData = async () => {
      const userFeeds = await Requests.getWithCredentials(Url.PRODUCT, "feeds");
      setUserFeeds(userFeeds);
  }

  useEffect(() => {
    Requests.auth().then(res => setVerified(res.isVerified));
    if(verified) { fetchData() };
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
