import {Link} from "react-router-dom";
import {ProductCard as Product} from "../../response-types/ResponseTypes"
import Image from "../Image/Image";
import { RiSendPlaneFill } from "react-icons/ri";
import {useEffect, useState} from "react";
import Requests, {Url} from "../../requests/Requests";

const ProductCard = (props:{product: Product, hasComment: Boolean}) => {
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string | null>("");
  const dateString = props.product.createdAt.toString().split("T")[0];

  const handleSubmit = async() => {
    const data = {
      uid: props.product.uid,
      pid: props.product.pid,
      comment
    };

    const addComment = await Requests.post(Url.PRODUCT, "comment", data).catch(err => {
      setMessage(null);
      setError(err);
    });

    if(addComment.message !== "") {
      setError(null);
      setMessage(addComment.message);
    }
    setComment("");
  }

  const getProfilePic = async() => {
    const profile = await Requests.get(Url.AUTH, `profile/${props.product.uid}`)    
    if(profile) {
      setProfilePic(profile.profilePic);
    }
  }


  useEffect(() => {
    getProfilePic();
  }, [])


  return (
    <div className="product-card productSection">
      {error ? <p className="warning-banner">
        <strong onClick={()=>{setError(null);}} className="close-banner">x</strong>  
        {error}
      </p>: null} 

      {message ? <p className="message-banner">
        <strong onClick={()=>{setMessage(null);}} className="close-banner">x</strong>
        {message}
      </p>: null} 

      <div className="card">

        <div className="user-info">
          {profilePic ? <Image class="card-profile-pic" image={profilePic} /> : <div className="card-profile-pic"></div>}
          <strong className="username">{props.product.username}</strong>

        </div>

        <div className="product-info">

          <p className="card-description">{props.product.description}</p>
          {
            props.product.tags.map(tag => (
              <Link to={`/tag/${tag}`} className="tag" key={tag + props.product.pid}>#{tag}</Link>
            ))
          }
          <p className="post-date">Posted at:{dateString}</p>
        </div>
      <Link to={`/product/${props.product.pid}`}>
        <div className="product-image">
          <Image 
            image={props.product.image}
            class="primaryImg" 
          />
        </div>
    </Link>
        {props.hasComment ? 
          <div className="product-comment-bar">
            <input 
              value={comment}
              placeholder="Add a comment..."
              className="product-comment"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                setComment(e.target.value)
              }}
            />
            <RiSendPlaneFill 
              color="darkgrey"
              className="product-send"
              onClick={handleSubmit}
            />
          </div>
          :null}
      </div>
    </div>
  )
}

export default ProductCard
