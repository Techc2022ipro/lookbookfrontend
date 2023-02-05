import {useEffect, useState} from "react";
import Requests, {Url} from "../../requests/Requests";
import {Product} from "../../response-types/ResponseTypes";
import ProductCard from "../../common-components/ProductCard/ProductCard";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import AllTags from "../../components/AllTags/AllTags";

const Explore = (props: {verified:Boolean}) => {

  const [data, setData] = useState<Product[]>([]);
  const [verified, setVerified] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const fetchData = async () => {
    const productData = await Requests.get(Url.PRODUCT, "");
    setData(productData);
    setIsLoading(false);
  }

  const limitlessScrolling = async () => {
    const cursor = data ? data[data.length - 1].pid : 0;
    const productData = await Requests.get(Url.PRODUCT, `?cursor=${cursor}}`)
    setData(old => [...old, ...productData]);
}

useEffect(() => {
  fetchData();
  Requests.auth().then(res => setVerified(res.isVerified));
},[verified])

if(isLoading) {
  return (<IsLoading />);
}

if(data.length <= 0) {
  return (
    <div className="empty-data"> Nothing to see here 🐔. </div>
  )
}

return (
  <div>
      <AllTags />

    {
      data.map(product => (
        <div key={product.pid}> 
          <ProductCard 
            product = {product}
            hasComment={props.verified}
          />
          <br/>
        </div>
      ))
    }
    <button onClick={limitlessScrolling}>see more</button>
  </div>
)
}

export default Explore
