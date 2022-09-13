import {useEffect, useState} from "react";
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

  return (
    <div>
      {
        data ? data.map(product => (
          <div> 
            <p>{product.name}</p>
            <p>{product.seller}</p>
            <p>{product.description}</p>
          </div>

        )) : "no data"
      }
    </div>
  )
}

export default Explore
