import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../common-components/ProductCard/ProductCard";
import Requests, {Url} from "../../requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Tags = (props:{verified:Boolean}) => {
  const  { slug }  = useParams() as { slug: string };
  const [data, setData] = useState<Product[]>([]);

  const fetchData = async() => {
    const productData = await Requests.get(Url.PRODUCT, `tag/${slug}`);
    setData(productData);
  }

  useEffect(() => {
    fetchData();
  });

  return( 
    <div>
      <strong className="sub-title">Filtered by: {slug}</strong>
      {
        data.map(product => (
          <div key={product.pid}>
            <ProductCard
              product={product}
              hasComment={props.verified}
            />
          </div>
        ))
      }
    </div>
  )
}

export default Tags;
