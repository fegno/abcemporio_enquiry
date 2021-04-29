import React from 'react';
import { ErrorMessage } from 'formik';
import error from "./index.module.scss";
export const Error : React.FC<{name:string}>=(props)=>{
    return <ErrorMessage name={props.name} render={(msg) => {
        return <div className={error.wrapper}>
            <div className={error.message}>{msg}</div>
        </div>
    }} />
}