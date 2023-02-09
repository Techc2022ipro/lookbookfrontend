import {Link} from "react-router-dom";
import {ProductCard as Product} from "../../response-types/ResponseTypes"
import Image from "../Image/Image";
import {useEffect, useState} from "react";
import {isVerified} from "../../libs/Verified";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaCommentAlt } from "react-icons/fa";
import Requests, {Url} from "../../requests/Requests";

const ProductCard = (props:{product: Product}) => {
  const dateString = props.product.createdAt.toString().split("T")[0];
  const [comment, setComment] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
  })

  const handleSubmit = async() => {
    const data = {
      uid: props.product.uid,
      pid: props.product.pid,
      comment
    };

    const addComment = await Requests.post(Url.PRODUCT, "/comment", data)

    if(!addComment.data){
      setError(addComment.message);
    }

    if(addComment.data) {
      setMessage(addComment.data.message)
      setComment("");
    }
  }

  const Message = () => {
    if(message) {
      return (
        <p className="message-banner">
          <strong onClick={()=>{setMessage(null);}} className="close-banner">x</strong>
          {message}
        </p> 
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
    <div className="product-card productSection">
      <Error />
      <Message />

      <div className="card">
        <div className="user-info">
          <div className="card-profile-pic"></div>
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
        <div className="product-card-image">
          <Image 
            image={props.product.image}
            class="primaryImg" 
          />
        </div>
    </Link>
        <p className="comment-count"><FaCommentAlt  className="comment-icon" />{props.product.comment.length}</p>
        {isVerified() ? 
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
