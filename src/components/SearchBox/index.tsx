import { HTMLAttributes } from "react";
import "./index.css";

const SearchBox = (props: Partial<HTMLAttributes<HTMLInputElement>>) => {
  return (
    <div className="SearchBox mb-2">
      <input className="SearchBox-Input" {...props}></input>
    </div>
  );
};

export default SearchBox;
