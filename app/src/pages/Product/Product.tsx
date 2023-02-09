import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Requests, {Url} from "../../requests/Requests";
import {Product as ProductData} from "../../response-types/ResponseTypes";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import {DateToStr} from "../../libs/datetostring";
import Image from "../../common-components/Image/Image";
import { FcLike } from "react-icons/fc";
import {isVerified} from "../../libs/Verified";

const Product = () => {

  const { pid } = useParams<{pid: string}>();
  const [product, setProduct] = useState<ProductData>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>();
  const [likes, setLikes] = useState<number>()

  const getProductData = async() => {
    const product = await Requests.get(Url.PRODUCT, `/product/${pid}`);
    if(!product.data) {
      setError(product.message);
    }

    if(product.data) {
      setProduct(product.data);
      setLikes(product.data.likes);
      setIsLoading(false);
    }
  }

  const Error = () => {
    if(error) {
      return (
        <p className="error-banner">
          <strong onClick={()=>{setError(null);}} className="close-banner">x</strong>
          {error}
        </p> 
      )
    }
    return null;
  }

  useEffect(() => {
    getProductData();
  }, [likes])



  if(!product) {
    return (
      <div className="empty-data"> Nothing to see here 🐔. </div>
    )
  } 

  const Likes = () => {
    if(isVerified()) {
      return (
        <p className="product-likes">
        <FcLike className="product-likes-icon" 
          onClick={ async () => {
            await Requests.get(Url.PRODUCT, `/product/addlikes/${product.pid}`)
            setLikes(likes ? likes+1 : 0);
          }}
          />
        <strong className="product-likes-count">
        {product.likes}
        </strong>
        </p>
      )
    }
    return null;
  }


  if(isLoading) return (<IsLoading />);

  return (
    <div className="product-screen">
      <Error />
      <div className="product-image">
        <Image image={product.image} class="primary-image" />
      </div>
      <div className="product-detail">
        <h3 className="product-title">{product.name}</h3>
        <h2 className="product-brand"><strong>Brand: </strong>{product.brand}</h2>
        <div className="product-tag-div">
          {
            product.tags.map(tag => (
              <Link to={`/tag/${tag}`} className="product-tag" key={tag + product.pid}>#{tag}</Link>
            ))
          }
        </div>
        <p className="product-description">{product.description}</p>
        <p className="product-posted-date">Posted-at: {DateToStr(product.createdAt)}</p>
        <p className="product-price"><strong>Price:</strong> ${product.price}</p>
        <p className="product-quantity"><strong>Quantity:</strong>{product.quantity}</p>
        <Likes />
      </div>
    </div>
  )
}

export default Product;

