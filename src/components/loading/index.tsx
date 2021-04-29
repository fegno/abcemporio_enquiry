import React from "react" ;
import loader from "./index.module.scss";
export const LoadingSpinner : React.FC = ()=>{
    return <div className={loader.wrapper}>
        <div className={loader.loader}></div>
    </div>
}