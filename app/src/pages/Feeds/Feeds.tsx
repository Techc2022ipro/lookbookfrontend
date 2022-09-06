import axios from "axios";
import {useEffect} from "react";
import {useCookies} from "react-cookie";

const Feeds = () => {
  const [cookie] = useCookies(['authToken']);
  const fetchData = async () => {
    await axios.get("http://localhost:2000/feeds", {headers:{ 'auth': cookie.authToken } });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      this is the feeds page
    </div>
  )
}

export default Feeds;
