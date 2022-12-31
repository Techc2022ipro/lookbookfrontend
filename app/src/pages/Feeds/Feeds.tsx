import {useEffect, useState} from "react";
import Requests, {Url} from "../../requests/Requests";
import Login from "../../common-components/Login/Login";

const Feeds = (props: {verified: Boolean}) => {
  const [userFeeds, setUserFeeds] = useState(null);

  const fetchData = async () => {
      const userFeeds = await Requests.getWithCredentials(Url.PRODUCT, "feeds");
      setUserFeeds(userFeeds);
  }

  useEffect(() => {
    fetchData() 
  }, []);

  if(!props.verified) {
    return (<Login path="/feeds" />)
  }

  return (
    <div>
      {
        userFeeds
      }
    </div>
  )
}

export default Feeds;
