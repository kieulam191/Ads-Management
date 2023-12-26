import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../services/api";
import { AppContext } from "../../context/AppContext";

const AreaForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      ward: "",
      district: "",
      province: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.ward) {
        errors.ward = "Required";
      }

      if (!values.district) {
        errors.district = "Required";
      }
      if (!values.province) {
        errors.province = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      //   if (id) {
      //     await axios.patch(`/ads/table-types/${id}`, values);
      //   } else {
      //     await axios.post("/ads/table-types", values);
      //   }

      //   const response = await axios.get("/ads/table-types");
      //   dispatch({ type: "SET_AD_TYPES", payload: response.data.data });

      //   history.push("/adtables");
    },
  });

  //   useEffect(() => {
  //     console.log("da chon");
  //     // const fetchAdPoint = async () => {
  //     //   if (id) {
  //     //     const response = await axios.get(`/ads/types/${id}`);
  //     //     formik.setValues(response.data);
  //     //   }
  //     // };
  //     // fetchAdPoint();
  //   }, [formik]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} ad table types</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Provinces:
          <select
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
          >
            <option value="">select province</option>
            <option value="79">TP HCM</option>
            <option value="80">Ha Noi</option>
          </select>
          {formik.touched.province && formik.errors.province ? (
            <div>{formik.errors.province}</div>
          ) : null}
        </label>
        <label>
          District:
          <select
            name="district"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.district}
          >
            <option value="">select district</option>
            <option value="27561">Quan 1</option>
            <option value="27562">quan 2</option>
            <option value="27563">Quan 3</option>
            <option value="27564">Quan 4</option>
          </select>
          {formik.touched.district && formik.errors.district ? (
            <div>{formik.errors.district}</div>
          ) : null}
        </label>
        <label>
          Ward:
          <select
            name="ward"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ward}
          >
            <option value="">select ward</option>
            <option value="27561">Phuong 1</option>
            <option value="27562">Phuong 2</option>
            <option value="27563">Phuong 3</option>
            <option value="27564">Phuong 4</option>
          </select>
          {formik.touched.ward && formik.errors.ward ? (
            <div>{formik.errors.ward}</div>
          ) : null}
        </label>
        <button type="submit">{id ? "Update" : "Add"} Ad table type</button>
      </form>
    </div>
  );
};

export default AreaForm;
