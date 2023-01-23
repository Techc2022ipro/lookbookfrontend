import {useEffect, useState} from "react";
import Image from "../../common-components/Image/Image";
import Login from "../../common-components/Login/Login";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import Requests, {Url} from "../../requests/Requests";
import { Profile as UserProfile } from "../../response-types/ResponseTypes";

const Profile = (props: {verified: Boolean}) => {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async() => {
    const profile = await Requests.getWithCredentials(Url.AUTH, "profile");
    setUserProfile(profile);
  }
  useEffect(() => {
    fetchProfile();
  },[])

  if(!props.verified) {
    return (<Login path="/profile" />);
  }


  return (
    <div>
      {userProfile && userProfile.profilePic ? 
      <Image class="profile-pic" image={userProfile.profilePic} /> 
      : null 
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
