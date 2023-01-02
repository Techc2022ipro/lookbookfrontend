import {useEffect, useState} from "react";
import Image from "../../common-components/Image/Image";
import Login from "../../common-components/Login/Login";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import Requests, {Url} from "../../requests/Requests";
import { Profile as UserProfile } from "../../response-types/ResponseTypes";

const Profile = (props: {verified: Boolean}) => {

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [message, setMessage] = useState<string | null>(null);

  const fetchProfile = async() => {
    const profile = await Requests.getWithCredentials(Url.AUTH, "profile");
    if(profile.message) {
      setMessage(profile.message)
    } else {
      setUserProfile(profile)
    }
  }

  useEffect(() => {
    fetchProfile();
  },[props.verified])


  if(!props.verified) {
    return (<Login path="/profile" />);
  }

  if(!userProfile) {
    return <CreateProfile />
  }

  // set profile picture
  const ProfilePicture = () => {
    if (!userProfile.profilePic) {
      return (
        <div className="sample-profile-pic"></div>
      )
    }
    return (
      <Image class="profile-pic" image={userProfile.profilePic} />
    )
  }

  return (
    <div>
      { message ? <p className="warning-banner">
        <strong onClick={()=>{setMessage(null);}} className="close-banner">x</strong>  
        {message}
      </p> : null}
      <ProfilePicture />
        <div>
        <p>{userProfile.firstName} {userProfile.lastName}</p>
        <p>{userProfile.phoneNo}</p>
          {
            userProfile.tags.map(tag => (
              <p key={tag}>{tag}</p>
            ))
          }
        </div>
    </div>
  )
}

export default Profile;
