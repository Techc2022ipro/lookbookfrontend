import React, {useEffect, useState} from "react";
import Button from "../../common-components/customHtmlComponents/Button/Button";
import {ProfileQuery, Tags} from "../../entities/Props";
import Requests, {Url} from "../../requests/Requests";

const defaultProfileQuery = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNo: "",
  tags: []
}

const CreateProfile = () => {
  const [body, setBody] = useState<ProfileQuery>(defaultProfileQuery);
  const [image, setImage] = useState<FileList>();
  const [tags, setTags] = useState<Tags[]>([]);
  const [selectTag, setSelectTag] = useState<string[]>([]);
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const formData = new FormData();
    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    if(body.address) {
      formData.append("address", body.address);
    }
    if(body.phoneNo) {
      formData.append("phoneNo", body.phoneNo)
    }
    if(image) {
      formData.append("profilePic", image[0])
    }
    selectTag.forEach(tag => formData.append("tags", tag));
    const upload = await Requests.postWithImage(Url.AUTH, "/profile", formData);
    if(!upload) return "Something went worng";
    setBody(defaultProfileQuery);
    setSelectTag([]);
  }

  const getAllTags = async () => {
    const allTags = await Requests.get(Url.PRODUCT, "/tags");
    if(!allTags.data) {
      setError(allTags.message);
    }
    if(allTags.data) {
      setTags(allTags.data)
    }
  }

  useEffect(() => {
    getAllTags();
  }, [selectTag])

  const handleChange = <P extends keyof ProfileQuery>(prop: P, value: ProfileQuery[P]) => {
    setBody({...body, [prop]: value});
    };

  const SelectTags = () => {
    if(selectTag.length < 3) {
      return (
        <div className="tag-box">
          {
            tags.map(tag => (
              <div key={tag.tagid}>
                <button className="select-tag" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.currentTarget.classList.toggle("disable-tag")
                  e.currentTarget.disabled = true
                  if (!selectTag.includes(tag.tag)) {
                    setSelectTag(arr => [...arr, tag.tag]);
                  }
                }}>{tag.tag}</button>
              </div>
            ))
          }
        </div>
      )
    }
    return null;
  }

  const Error = () => {
    if(error) {
    return(
      <p className="warning-banner">
        <strong onClick={()=>{setError(null);}} className="close-banner">x</strong>  
        {error}
      </p> 
    )
  }
  return null;
  }
  
  return (
    <div className="from-section">
      <Error />
      <form className="login-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="profilePic"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files;
            if(file){
              setImage(file);
            }
          }} />

        <input
          className="profile-input"
          type="text"
          placeholder="First Name"
          value={body.firstName}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            handleChange("firstName", e.target.value)
          }} />

        <input
          className="profile-input"
          type="text"
          placeholder="Last Name"
          value={body.lastName}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            handleChange("lastName", e.target.value)
          }} />


        <input
          className="profile-input"
          type="text"
          placeholder="Address"
          value={body.address}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            handleChange("address", e.target.value)
          }} />

        <input
          className="profile-input"
          type="text"
          placeholder="Phone Number"
          value={body.phoneNo}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            handleChange("phoneNo", e.target.value)
          }} />

        <div>
          <strong>Selected Tag:</strong> <br />
          <p>You can only select three tags.</p>
          {
            selectTag.map(tag => (
              <div key={tag}>
              <button className="selected-tag" onClick={
                (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  selectTag.splice(selectTag.indexOf(tag), 1)
                  e.currentTarget.classList.toggle("deselect-tag")
                }
              }># {tag}</button> <br />
              </div>
            ))
          }
        </div>
        <SelectTags />
        <Button type="submit" class="secondaryBtn" value="Upload" />
      </form>
    </div>
  )
}

export default CreateProfile; 
