import {useEffect, useState} from "react"
import ErrorComponent from "../../common-components/ErrorComponent/ErrorComponent"
import ProductCard from "../../common-components/ProductCard/ProductCard"
import Requests ,{ Url } from "../../requests/Requests"
import {Product} from "../../response-types/ResponseTypes"
import IsLoading from "../../common-components/IsLoading/IsLoading";

const Explore = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>();

  const getProducts = async() => {
    const products = await Requests.get(Url.PRODUCT, "/");
    if(!products.data) {
      setError(products.message)
    };
    setProducts(products.data);
    if(products){
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

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
    {
      products.map(item => (
        <ProductCard product={item} />
      ))
    }
  </div>
)
}

export default Explore
