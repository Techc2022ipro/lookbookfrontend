import {ProductModalType} from "../../response-types/ResponseTypes";
import Image from "../../common-components/Image/Image";

const ProductModal = (props: ProductModalType) => {
  return (
    <div className="productModal">
      <div className="productContainer">
        <button onClick={()=> props.onClose(false)}>close</button>
        <Image
          image = {props.image}
          class= "primary"
        />
        <p>name:{props.name}</p>
        <p>description:{props.description}</p>
        <p>brand:{props.brand}</p>
        <p>quantity:{props.quantity}</p>
        <p>price:{props.price}</p>
      </div>
     
    </div>
  )
}

export default ProductModal;

