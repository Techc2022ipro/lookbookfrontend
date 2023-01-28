import {useEffect, useState} from "react";
import Image from "../../common-components/Image/Image";
import Login from "../../common-components/Login/Login";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import Requests, {Url} from "../../requests/Requests";
import { Profile as UserProfile } from "../../response-types/ResponseTypes";
import IsLoading from "../../common-components/IsLoading/IsLoading";

const Profile = (props: {verified: Boolean}) => {

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const fetchProfile = async() => {
    const profile = await Requests.getWithCredentials(Url.AUTH, "profile");
    setUserProfile(profile);
    setIsLoading(false);
  }


  useEffect(() => {
    fetchProfile();
  },[])

  if(isLoading) {
    return (<IsLoading />);
  }

  if(!props.verified) {
    return (<Login path="/profile" />);
  }

  if(!userProfile) {
    return (
      <CreateProfile />
    )
  }

  const ProfilePic = () => {
    if (!userProfile.profilePic) {
      return (
        <div className="sample-profile-pic"></div>
      )
    } else {
      return (
        <Image class="profile-pic" image={userProfile.profilePic} />
      )
    }
  }


  return (
    <div>
      <ProfilePic />
      <div>
        <p>{userProfile.firstName} {userProfile.lastName}</p>
        <p>{userProfile.phoneNo}</p>
      </div>
    </div>
  )
}

export default Profile;
