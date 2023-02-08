const ErrorComponent = (props:{error: string}) => {
  return (
    <div className="error-banner">
      <p>{props.error}</p>
    </div>
  )
}

export default ErrorComponent;
