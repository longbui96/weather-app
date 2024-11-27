import { HTMLAttributes } from "react";
import "./index.css";

const Button = (props: Partial<HTMLAttributes<HTMLButtonElement>>) => {
  return <button className="Button" {...props}></button>;
};

export default Button;
