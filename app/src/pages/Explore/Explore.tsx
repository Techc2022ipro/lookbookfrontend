import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Requests from "../../Requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Explore = () => {

  const [data, setData] = useState<Product[] | null>(null);

  const fetchData = async () => {
    const productData = await Requests.get("http://localhost:2000");
    setData(productData);
  }
  useEffect(() => {
    fetchData();
  },[])
  const constructSellerLink = (name: string): string => {
   return name.split(" ").join("").toLowerCase();
  }

  return (
    <div>
      {
        data ? data.map(product => (
          <div> 
            <p>name: {product.name}</p>
            <p>seller: <Link to={constructSellerLink(product.seller)}>{product.seller}</Link></p>
            <p>description: {product.description}</p>
            <br/>
          </div>
        )) : "no data"
      }
    </div>
  )
}

export default Explore
