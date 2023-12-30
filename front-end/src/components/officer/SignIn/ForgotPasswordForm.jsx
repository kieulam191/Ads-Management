import React, { useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const ForgotPassForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      // console.log(values.email);
      // history.push({
      //   pathname: "/officers/auth/OTP",
      //   state: { email: values.email },
      // });
      console.log(values);
      await axios.post("accounts/forgot-password", values).then((res) => {
        history.push({
          pathname: "/officers/auth/OTP",
          state: { email: values.email },
        });
      });
    },
  });

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Ad Board</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </label>

        <button type="submit">Send OTP code</button>
      </form>
    </div>
  );
};

export default ForgotPassForm;
