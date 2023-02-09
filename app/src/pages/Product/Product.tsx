import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Requests, {Url} from "../../requests/Requests";
import {Product as ProductData} from "../../response-types/ResponseTypes";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import {DateToStr} from "../../libs/datetostring";
import Image from "../../common-components/Image/Image";

const Product = () => {

  const { pid } = useParams<{pid: string}>();
  const [product, setProduct] = useState<ProductData>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>();

  const getProductData = async() => {
    const product = await Requests.get(Url.PRODUCT, `/product/${pid}`);
    if(!product.data) {
      setError(product.message);
    }
    if(product.data) {
      setProduct(product.data);
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
  }, [])



  if(!product) {
    return (
      <div className="empty-data"> Nothing to see here 🐔. </div>
    )
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
      <p className="product-description">{product.description}</p>
      <p className="product-posted-date">Posted-at: {DateToStr(product.createdAt)}</p>
        <p className="product-price"><strong>Price:</strong> ${product.price}</p>
        <p className="product-quantity"><strong>Quantity:</strong>{product.quantity}</p>
    </div>
    </div>
  )
}

export default Product;

