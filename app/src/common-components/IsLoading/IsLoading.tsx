import ClipLoader from "react-spinners/ClipLoader";

const IsLoading = () => {
    return (
      <div className="spinner">
        <ClipLoader />
        <p className="loading-text">Loading ...</p>
      </div>
    )
}

export default IsLoading;