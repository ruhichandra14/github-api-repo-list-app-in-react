import { LOADING_MSG } from "../../constants/constants";

const Loading  = () => {
    return (
      <div className="loading-screen">
        <span className="info">{LOADING_MSG}</span>
        <div className="loader"></div>
      </div>
    ) 
}

export default Loading;