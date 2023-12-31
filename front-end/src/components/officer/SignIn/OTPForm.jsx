import React, { useEffect, useContext } from "react";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";
import "../message.css";
import "../ButtonForm.css";

const OTPForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { state, dispatch } = useContext(AppContext);

  const OTP_CODE_LEN = 6;

  const formik = useFormik({
    initialValues: {
      email: location.state.email,
      otp: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.otp) {
        errors.otp = "Required";
      }

      return errors;
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      //Xử lý nếu mã bắt đầu = 0
      for (var i = values.otp.length; i < OTP_CODE_LEN; ++i) {
        values.otp = "0" + values.otp;
      }

      await axios
        .post("/accounts/verify-otp", values)
        .then((res) => {
          if (res.status === 200) {
            history.replace({
              pathname: "/officers/resetpassword",
              state: { code: res.data.code },
            });
          }
        })
        .catch((err) => {
          formik.errors.otp = err.response.data.msg;
        });
    },
  });

  useEffect(() => {
    formik.values.otp = formik.values.otp + "";
  }, [formik.values.otp]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>
          OTP CODE
          <input
            type="number"
            name="otp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
          />
          {formik.touched.otp && formik.errors.otp ? (
            <div className="error">{formik.errors.otp}</div>
          ) : null}
        </label>
        <div className="btn">
          <button type="submit">reset</button>
        </div>
      </form>
    </div>
  );
};

export default OTPForm;
