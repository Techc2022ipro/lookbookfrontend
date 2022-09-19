import {useState} from "react";
import Requests from "./Requests";

const Auth = async () => {
  const [verified, setVerified] = useState<Boolean>(false);
    await Requests.getWithCredentials("http://localhost:8000/isVerified")
    .then(res => setVerified(res.isVerified));
  return verified;
}

export default Auth;
