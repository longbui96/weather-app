import { HTMLAttributes } from "react";
import "./index.css";

const Input = (props: Partial<HTMLAttributes<HTMLInputElement>>) => {
  return <input className="Input" {...props}></input>;
};

export default Input;
