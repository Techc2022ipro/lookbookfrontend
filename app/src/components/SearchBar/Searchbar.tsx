import React, {useState} from "react";
import {SearchQuery} from "../../entities/Search";
import Requests from "../../Requests/Requests";

const Searchbar = (props: SearchQuery) => {
  const [keyword, setKeyword] = useState<string>("")
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Requests.post(`http://localhost:2000/search/${props.slug}`, {keyword});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={keyword}
          placeholder="Search" 
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value)
          }}
        />
        <button>Search</button>
      </form>
    </div>
  )
}

export default Searchbar;
