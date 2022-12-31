import {useEffect, useState} from "react";
import Image from "../../common-components/Image/Image";
import Login from "../../common-components/Login/Login";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import Requests, {Url} from "../../requests/Requests";
import { Profile as UserProfile } from "../../response-types/ResponseTypes";

const Profile = (props: {verified: Boolean}) => {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async() => {
    await Requests.getWithCredentials(Url.AUTH, "profile").catch(err => {setError(err)}).then(data => {
      if(data) {
        setUserProfile(data);
      }
    });
  }

  useEffect(() => {
    fetchProfile();
  },[])

  if(!props.verified) {
    return (<Login path="/profile" />);
  }
  return (
    <div>
      { error ? <p className="warning-banner">
        <strong onClick={()=>{setError(null);}} className="close-banner">x</strong>  
        {error}
      </p> : null}
      {userProfile && userProfile.profilePic ? 
      <Image class="profile-pic" image={userProfile.profilePic} /> 
      : <div className="sample-profile-pic"></div>
      }
      {userProfile ?  
        <div>
        <p>{userProfile.firstName} {userProfile.lastName}</p>
        <p>{userProfile.phoneNo}</p>
        </div>
      : <CreateProfile />}
    </div>
  )
}

export default Profile;
