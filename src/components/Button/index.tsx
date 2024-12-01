import { HTMLAttributes, ReactElement } from "react";
import "./index.css";

interface IExtraProps {
  icon: ReactElement
}

const Button = (props: Partial<HTMLAttributes<HTMLButtonElement> & IExtraProps> ) => {
  const {icon, children, className, ...restProps} = props;
  
  return <button className={`${className} Button`} {...restProps}>
    {icon}
    {children}
  </button>;
};

export default Button;
