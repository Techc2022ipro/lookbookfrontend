import {useEffect, useState} from "react";
import Image from "../../components/Image/Image";
import Requests from "../../Requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Explore = () => {

  const [data, setData] = useState<Product[]>([]);

  const fetchData = async () => {
    const productData = await Requests.get("http://localhost:2000/");
    setData(productData);
  }

  const limitlessScrolling = async () => {
    const cursor = data ? data[data.length - 1].pid : 0;
    const productData = await Requests.get(`http://localhost:2000/?cursor=${cursor}}`)
      setData(old => [...old, ...productData]);
  }
  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      {
        data ? data.map(product => (
          <div> 
            <p><strong>name</strong>: {product.pid}</p>
            <p><strong>name</strong>: {product.name}</p>
            <p><strong>description</strong>: {product.description}</p>
            <Image
              image = {product.image}
              class = "secondary"
            />
            <br/>
          </div>
        )) : "no data"
      }
            <button onClick={limitlessScrolling}>see more</button>
    </div>
  )
}

export default Explore
