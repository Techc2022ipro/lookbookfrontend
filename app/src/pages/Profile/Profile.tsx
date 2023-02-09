import {useEffect, useState} from "react";
import Login from "../../common-components/Login/Login";
import {isVerified, Verified} from "../../libs/Verified";
import Requests, {Url} from "../../requests/Requests";
import { Profile as ProfileEntitiy} from "../../response-types/ResponseTypes";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import Image from "../../common-components/Image/Image";
import ErrorComponent from "../../common-components/ErrorComponent/ErrorComponent";

const Profile = () => {
  const [error, setError] = useState<string>('');
  const [profile, setProfile] = useState<ProfileEntitiy>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getProfile = async() => {
    if(isVerified()){
      const profile = await Requests.getWithCredentials(Url.AUTH, `/profile/${Verified.uid}`)
      if(!profile.data) {
        setError('User Profile is not set');
        setIsLoading(false);
      }
      if(profile.data) {
        setProfile(profile.data);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  },[])

  if(isLoading) return (<IsLoading />);
  if(!isVerified()) return <Login />;
  if(!profile) return <CreateProfile />;

  const ProfilePic = () => {
    if(profile.profilePic) return <Image image={profile.profilePic} class="profiles-profile-pic" />
    return <div className="card-profile-pic"></div>
  }

  const Error = () => {
    if(error) return <ErrorComponent error={error} />
    return null;
  }

  return (
    <div className="profile-div">
      <div>
        <Error />
        <ProfilePic />
        <p className="profile-user">{profile.firstName} {profile.lastName} </p>
        <p className="profile-address">{profile.address ? profile.address : 'n/a'} </p>
        <p>{profile.phoneNo ? profile.phoneNo : 'n/a'} </p>
      </div>
    </div>
  )
}

export default Profile;
