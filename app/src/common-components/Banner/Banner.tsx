const Banner = (props: {message: string, type: string}) => {
  return (
    <div className={props.type}>
      <p>{props.message}</p>
    </div>
  )
}

export default Banner;

