import React from "react";
import form from "./index.module.scss";
import { SCHEMA, INITIAL_VALUES } from "./schema";
import Select from "react-select";
import { DISTRICTS } from "../../data/districts";
import { PRODUCTS } from "../../data/products";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Form } from "formik";
import startsWith from "lodash.startswith";
import { Error } from "../error";
const COUNTRY_DEFAULT = "in";
const customStyles = {
  control: (_:any, { selectProps: { width }}:any) => ({
    ..._,
    width: "100%" ,
    height : 50 ,
    borderColor : "#efefef !important" ,
    outlineColor:"#000" ,
    hover : {
      opacity : .1
    }
  }),
  valueContainer : (provided:any,state:any)=>({
    ...provided ,
    fontWeight : 500
  })
  }
class ContactForm extends React.Component<{onComplete:()=> void }, { non_field_error: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      non_field_error: false,
    };
  }
  handleSubmit = (values: any, { setErrors ,setSubmitting , isSubmitting }: any) => {
    setSubmitting(true);
    fetch("https://enquiries.abcemporio.com/ajax/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: new Headers({
        "Content-Type": "aplication/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting( false );
        if (!res.status) {
          if (res.field_error) {
            setErrors(res.errors);
            return;
          } else {
            this.setState({
              non_field_error: res.error,
            });
          }
        }else{
          this.close();
        }
      });
  };
  close = ()=>{
    this.props.onComplete();
  }
  render() {
    return (
      <div className={form.wrapper}>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={SCHEMA}
          onSubmit={this.handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            setTouched,
            isSubmitting
          }) => (
            <Form>
              <div className={form.inner}>
              
              <div className={form.row}>
                <div className={form.input_wrapper}>
                  <Select
                   styles={customStyles}
                    defaultInputValue={INITIAL_VALUES.product}
                    name="product"
                    onChange={(data: any) => {
                      setFieldValue("product", data.value);
                    }}
                    onBlur={(a) => {
                      setTouched({ ...touched, product: true }, true);
                    }}
                    options={PRODUCTS}
                    placeholder="Select Product"
                  />
                </div>
                <Error name="product" />
              </div>
              <div className={form.row}>
                <div className="row">
                  <div className="col-12 col-md-6">
                  <div className={form.input_wrapper}>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    autoComplete="true"
                    className={form.primary}
                  />
                </div>
                <Error name="name" />
                  </div>
                  <div className={`col-12 col-md-6 ${form.col_phone}`}>

                  <div className={form.input_wrapper}>
                  <PhoneInput
                    isValid={(inputNumber, country, countries) => {
                      return countries.some((country: any) => {
                        return (
                          startsWith(inputNumber, country.dialCode || "") ||
                          startsWith(country.dialCode, inputNumber)
                        );
                      });
                    }}
                    inputProps={{
                      autoComplete: true,
                    }}
                    country={COUNTRY_DEFAULT}
                    value={values.phone}
                    onBlur={() => {
                      setTouched({ ...touched, phone: true });
                    }}
                    onChange={(phone, { dialCode }: any) => {
                      setFieldValue("phone", phone === dialCode ? "" : phone);
                    }}
                  />
                </div>
                <Error name="phone" />
                  </div>
                </div>
                
              </div>
         

              <div className={form.row}>
                <div className={form.input_wrapper}>
                  <Select
                    style={{opacity:.1}}
                    styles={customStyles}
                    name="district"
                    defaultInputValue={INITIAL_VALUES.district}
                    onChange={(data: any) => {
                      setFieldValue("district", data.value);
                    }}
                    onBlur={(a) => {
                      setTouched({ ...touched, district: true });
                    }}
                    options={DISTRICTS}
                    placeholder="Select District"
                  />
                </div>
                <Error name="district" />
              </div>

              <div className={form.row}>
                <button disabled={isSubmitting} type="submit" className={form.submit_button}>
                  <span style={{
                    opacity : isSubmitting ? 0 : 1
                  }}>Submit </span>
                 { isSubmitting &&  <div className={form.button_loader}><div className={form.loader}>Loading...</div></div>}
                </button>
              </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default ContactForm;
