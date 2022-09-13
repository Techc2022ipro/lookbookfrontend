import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Requests from "../../Requests/Requests";

const Feeds = () => {

  const [userFeeds, setUserFeeds] = useState(null);

  const fetchData = async () => {
      const userFeeds = await Requests.getWithCredentials("http://localhost:2000/feeds");
      setUserFeeds(userFeeds);
  }

    useEffect(() => {
    fetchData();
  }, []);

  if(!Cookies.get("authToken")) return (<Redirect to="/login" />)
  return (
    <div>
      {
        userFeeds
      }
    </div>
  )
}

export default Feeds;
