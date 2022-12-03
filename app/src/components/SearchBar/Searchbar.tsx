import React, {useState} from "react";
import Button from "../../common-components/customHtmlComponents/Button/Button";
import {SearchQuery} from "../../entities/Search";
import Requests, {Url} from "../../requests/Requests";

const Searchbar = (props: SearchQuery) => {
  const [keyword, setKeyword] = useState<string>("")
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Requests.post(Url.PRODUCT, `search/${props.slug}`, {keyword});
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-box">
        <input 
          className="searchbarInput"
          type="text" 
          value={keyword}
          placeholder="Search" 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value)
          }}
        />
        <Button 
        type="submit" 
        value="Search"
        class="secondaryBtn" />

        
      </form>
    </div>
  )
}

export default Searchbar;
