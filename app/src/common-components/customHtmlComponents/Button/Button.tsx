const Button = (props: {value: string, type: "submit" | "reset", class:string}) => { 
  return (
    <button type={props.type} className={props.class}>{props.value}</button>
  )
}

export default Button;
