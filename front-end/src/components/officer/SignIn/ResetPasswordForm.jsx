import React, { useEffect, useContext } from "react";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const ResetPassowordForm = () => {
  const { id } = useParams();
  const history = useHistory();
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
        .patch(`/accounts/${location.state.id}/reset-password`, rest)
        .then((res) => console.log(res));
    },
  });

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Ad Board</h2>
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
            <div>{formik.errors.new_password}</div>
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
            <div>{formik.errors.re_password}</div>
          ) : null}
        </label>

        <button type="submit">Send OTP code</button>
      </form>
    </div>
  );
};

export default ResetPassowordForm;
