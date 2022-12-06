import React, {useState} from "react";
import Requests, {Url} from "../../requests/Requests";

const Searchbar = () => {
  const [keyword, setKeyword] = useState<string>("")

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Requests.post(Url.PRODUCT, `search/`, {keyword});
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
      </form>
    </div>
  )
}

export default Searchbar;
