import {useEffect, useState} from "react";
import Requests from "../../Requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Explore = () => {

  const [data, setData] = useState<Product[] | null>(null);

  const fetchData = async () => {
    const productData = await Requests.get("http://localhost:2000/");
    setData(productData);
  }
  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      {
        data ? data.map(product => (
          <div> 
            <p><strong>name</strong>: {product.name}</p>
            <p><strong>description</strong>: {product.description}</p>
            <img src = {`https://ipro-develop-bucket.s3.ap-northeast-1.amazonaws.com/${product.image}`} />
            <br/>
          </div>
        )) : "no data"
      }
    </div>
  )
}

export default Explore
