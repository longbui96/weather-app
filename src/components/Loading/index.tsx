import LoadingGif from "../../assets/loading.gif";
import "./index.css";

const Loading = ({
  isLoading = false,
  className = "",
  style = {},
  ...props
}) => {
  return isLoading ? (
    <img
      className={`Loading ${className}`}
      src={LoadingGif}
      alt="Loading..."
      style={style}
      {...props}
    />
  ) : null;
};

export default Loading;
