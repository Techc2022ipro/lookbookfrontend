import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../common-components/ProductCard/ProductCard";
import Requests, {Url} from "../../requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Tags = () => {
  const  { slug }  = useParams() as { slug: string };
  const [data, setData] = useState<Product[]>([]);

  const fetchData = async() => {
    const productData = await Requests.get(Url.PRODUCT, `tag/${slug}`);
    setData(productData);
  }

  useEffect(() => {
    fetchData();
  },[slug]);

  return( 
    <div>
      <strong className="sub-title">Filtered by: {slug}</strong>
      {
        data.map(product => (
          <div key={product.pid}>
            <ProductCard
              pid = {product.pid}
              uid = {product.uid}
              username = {product.username}
              image = {product.image}
              description = {product.description}
              date = {product.createdAt}
              tags={product.tags}
            />
          </div>
        ))
      }
    </div>
  )
}

export default Tags;
