import * as Yup from "yup" ;
export const SCHEMA = Yup.object().shape({
    product : Yup.string().required("Please select product")  ,
    name : Yup.string().required("Name is required") ,
    phone : Yup.string().required("Phone number is required") ,
    district : Yup.string().required("Please select your district")
});
export const INITIAL_VALUES = {
        product : "" ,
        name : "" , 
        phone : "" ,
        district : ""
};