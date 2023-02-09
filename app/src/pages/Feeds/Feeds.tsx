import {useEffect, useState} from "react";
import Login from "../../common-components/Login/Login";
import {isVerified, Verified} from "../../libs/Verified";
import IsLoading from "../../common-components/IsLoading/IsLoading";
import Requests, {Url} from "../../requests/Requests";
import { Product, Profile as ProfileEntitiy} from "../../response-types/ResponseTypes";
import ProductCard from "../../common-components/ProductCard/ProductCard";

const Feeds = () => {
  const [error, setError] = useState<string>('');
  const [profile, setProfile] = useState<ProfileEntitiy>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [tag, setTag] = useState<string>();

  const getProfile = async() => {
    if(isVerified()){
      const profile = await Requests.getWithCredentials(Url.AUTH, `/profile/${Verified.uid}`)
      if(!profile.data) {
        setError('User Profile is not set');
        setIsLoading(false);
      }

      if(profile.data) {
        setProfile(profile.data);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  const getProducts = async() => {
    if(!profile) {
      return ( <div className="empty-data"> Nothing to see here 🐔. </div>
      )
    }
    if(!profile.tags){

      return ( 
        <div className="empty-data"> Profile not set 🐔. </div>
      )
    }
    const products = await Requests.get(Url.PRODUCT, `/tag/${tag}`);

    if(!products.data) {
      setError(products.message)
    };
    if(products){
      setProducts(products.data);
      setIsLoading(false);
    }
  }
    getProducts()
  },[tag])


  if(!profile) {
    return (
      <div className="empty-data"> Nothing to see here 🐔. </div>
    )
  }
  const Nothing = () => {
    if(products.length === 0) {
    return (
      <div className="nothing"> Nothing to see here 🐔. </div>
    ) }
    return null;
  }

  if(!isVerified()) {
    return (<Login />)
  }
  
  if(isLoading) return (<IsLoading />);


  return (
    <>
    <div className="feeds-label">

      <div className="feeds-title-div">
      <strong className="feeds-title">Here are some products you might like.</strong>
      <p className="feeds-sub-title">Try clicking the tag</p>
      </div>

      <div className="feeds-tag-div">
      {
        profile.tags.map(tag => (
          <a key={tag} className="feeds-tag" onClick={() => 
            {
              window.scrollTo(0, 800)
              setTag(tag)
            }}>#{tag}</a>
        ))
      }
      </div>
    </div>

    {
      products.map(item => (
        <div key={item.pid}>
        <ProductCard product={item} />
        </div>
      ))
    }
      <Nothing />
    </>
  )
}

export default Feeds;
