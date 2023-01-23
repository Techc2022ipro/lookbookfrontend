import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../common-components/ProductCard/ProductCard";
import Requests, {Url} from "../../requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

<<<<<<< HEAD
const Tags = () => {
  const  { slug }  = useParams() as { slug: string };
  const [data, setData] = useState<Product[]>([]);
  const [verified, setVerified] = useState<Boolean>(false);
=======
const Tags = (props:{verified:Boolean}) => {
  const  { slug }  = useParams() as { slug: string };
  const [data, setData] = useState<Product[]>([]);
>>>>>>> 77c4451 (page: profile settings added)

  const fetchData = async() => {
    const productData = await Requests.get(Url.PRODUCT, `tag/${slug}`);
    setData(productData);
  }

  useEffect(() => {
    fetchData();
<<<<<<< HEAD
    Requests.auth().then(res => setVerified(res.isVerified));
  },[slug, verified]);
=======
  });
>>>>>>> 77c4451 (page: profile settings added)

  return( 
    <div>
      <strong className="sub-title">Filtered by: {slug}</strong>
      {
        data.map(product => (
          <div key={product.pid}>
            <ProductCard
              product={product}
<<<<<<< HEAD
              hasComment={verified}
=======
              hasComment={props.verified}
>>>>>>> 77c4451 (page: profile settings added)
            />
          </div>
        ))
      }
    </div>
  )
}

export default Tags;
