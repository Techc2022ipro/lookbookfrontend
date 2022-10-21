import {ImageProps} from "../../entities/Props";

const Image = (props: ImageProps) => {
  return (
    <img 
      src = {`https://ipro-develop-bucket.s3.ap-northeast-1.amazonaws.com/${props.image}`} 
      className={props.class}
    />
  )
}

export default Image;

