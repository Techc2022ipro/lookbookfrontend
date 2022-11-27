import {useEffect, useState} from "react";
import Image from "../../common-components/Image/Image";
import ProductModal from "../../components/ProductModal/ProductModal";
import Requests, {Url} from "../../requests/Requests";
import {Product} from "../../response-types/ResponseTypes";

const Explore = () => {

  const [data, setData] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [productModal, setProductModal] = useState<Product>();

  const fetchData = async () => {
    const productData = await Requests.get(Url.PRODUCT, "");
    setData(productData);
  }

  const limitlessScrolling = async () => {
    const cursor = data ? data[data.length - 1].pid : 0;
    const productData = await Requests.get(Url.PRODUCT, `?cursor=${cursor}}`)
      setData(old => [...old, ...productData]);
  }
  
  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      {
        isOpen && productModal ? 
          <div>
          <ProductModal 
          pid={productModal.pid} 
          uid={productModal.uid}
          name={productModal.name}
          brand={productModal.brand}
          quantity={productModal.quantity}
          price={productModal.price}
          description={productModal.description}
          image={productModal.image}
          onClose={setIsOpen}
        /> 
        </div>

            : null 
      }
      {
        data ? data.map(product => (
          <div key={product.pid} onClick={() => {
            setProductModal(product);
            setIsOpen(!isOpen);
            }}> 
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
