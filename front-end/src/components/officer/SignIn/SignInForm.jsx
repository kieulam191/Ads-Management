import React, { useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const SignInForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axios
        .post("/auth/signin", values)
        .then((response) => console.log(response));

      // const response = await axios.get("/adboards");
      // dispatch({ type: "SET_AD_BOARDS", payload: response.data });

      //history.push("/adboards");
    },
  });

  // useEffect(() => {
  //   const fetchAdBoard = async () => {
  //     if (id) {
  //       const response = await axios.get(`/adboards/${id}`);
  //       formik.setValues(response.data);
  //     }
  //   };

  //   fetchAdBoard();
  // }, [id, formik]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Ad Board</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* <label>
          Email
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.eamil}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.eamil}</div>
          ) : null}
        </label> */}

        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </label>

        <label>
          PassWord
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </label>

        <Link to="/officers/forgot-password">Forgot Password?</Link>
        <br />

        <button type="submit">{id ? "Update" : "Add"} Ad Board</button>
      </form>
    </div>
  );
};

export default SignInForm;
