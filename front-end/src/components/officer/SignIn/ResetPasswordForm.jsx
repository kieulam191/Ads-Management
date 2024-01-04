import React, { useEffect, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";
import "../message.css";
import "../ButtonForm.css";

const ResetPassowordForm = () => {
  const { id } = useParams();
  const history = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      new_password: "",
      re_password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.new_password) {
        errors.new_password = "Required";
      }

      if (values.re_password !== values.new_password) {
        errors.re_password = "don't match";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { re_password, ...rest } = values;
      axios
        .patch(`/accounts/reset-password/${location.state.code}`, rest)
        .then((res) => {
          history("/officers/signin", { replace: true });
        });
    },
  });

  return (
    <div>
      <h2>Change password</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          New Password
          <input
            type="password"
            name="new_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.new_password}
          />
          {formik.touched.new_password && formik.errors.new_password ? (
            <div className="error">{formik.errors.new_password}</div>
          ) : null}
        </label>

        <label>
          Re-new Password
          <input
            type="password"
            name="re_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.re_password}
          />
          {formik.touched.re_password && formik.errors.re_password ? (
            <div className="error">{formik.errors.re_password}</div>
          ) : null}
        </label>

        <div className="btn">
          <button type="submit">Change password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassowordForm;
