import Login from "../../common-components/Login/Login";

const Feeds = () => {
  if(!sessionStorage.getItem('username')) {
    return (<Login />)
  }

  return (
    <div>
    </div>
  )
}

export default Feeds;
