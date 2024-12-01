import LoadingGif from "../../assets/loading.gif"

import "./index.css"

const Loading = ({isLoading = false}) => {
  return isLoading ? <img className={"Loading"} src={LoadingGif} alt="Loading..."></img> : <></>
}

export default Loading