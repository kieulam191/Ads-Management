import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../../services/api";
import { AppContext } from "../../../../context/AppContext";

const AdTableForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (id) {
        await axios.patch(`/ads/table-types/${id}`, values);
      } else {
        await axios.post("/ads/table-types", values);
      }

      const response = await axios.get("/ads/table-types");
      dispatch({ type: "SET_AD_TYPES", payload: response.data.data });

      history.push("/adtables");
    },
  });

  useEffect(() => {
    console.log(id);
    // const fetchAdPoint = async () => {
    //   if (id) {
    //     const response = await axios.get(`/ads/types/${id}`);
    //     formik.setValues(response.data);
    //   }
    // };
    // fetchAdPoint();
  }, [id, formik]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} ad table types</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </label>
        <button type="submit">{id ? "Update" : "Add"} Ad table type</button>
      </form>
    </div>
  );
};

export default AdTableForm;
