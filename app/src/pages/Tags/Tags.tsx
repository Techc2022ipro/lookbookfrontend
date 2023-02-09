import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../common-components/ProductCard/ProductCard";
import Requests, {Url} from "../../requests/Requests";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import ErrorComponent from "../../common-components/ErrorComponent/ErrorComponent"
import {Product} from "../../response-types/ResponseTypes";

const Tags = () => {
  const  { slug }  = useParams() as { slug: string };
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();


  useEffect(() => {
  const getProducts = async() => {
    const products = await Requests.get(Url.PRODUCT, `/tag/${slug}`);
    
    if(!products.data) {
      setError(products.message)
    };
    if(products){
      setProducts(products.data);
      setIsLoading(false);
    }
  }
    getProducts()
  }, [slug])

  if(isLoading) {
    return (<IsLoading />);
  }
  if(error) {
    return (
    <ErrorComponent error={error} />
    )
  }

  if(!products) {
    return (
      <div className="empty-data"> Nothing to see here 🐔. </div>
    )
  } 

return (
  <div>
    <strong className="sub-title">Filtered by: {slug}</strong>
    {
      products.map(item => (
        <div key={item.pid}>
        <ProductCard product={item} />
        </div>
      ))
    }
  </div>
)
}

export default Tags;
