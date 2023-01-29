import {useState} from "react";

const ErrorComponent = (props:{message: string}) => {

  const [errors, setErrors] = useState<string>("")

  if (props.message === "login error") {
    setErrors("Wrong Username/Password.")
  }

  return (
    <div>
      <p>{errors}</p>
    </div>
  )
}

export default ErrorComponent;
