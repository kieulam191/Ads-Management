import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";

const AdBoardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      report_type: "",
      name: "",
      email: "",
      phone_number: "",
      report_content: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.report_type) {
        errors.report_type = "Required";
      }

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.phone_number) {
        errors.phone_number = "Required";
      }

      if (!values.report_content) {
        errors.report_content = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.values.phone_number = formik.values.phone_number + "";
  }, [formik.values.phone_number]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add"} Ad Board</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Hình Thức Báo Cáo:
          <select
            name="report_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.report_type}
          >
            <option value="">Chọn hình thức</option>
            <option value="1">Tố giác tội phạm</option>
            <option value="2">Đăng ký nội dung</option>
          </select>
          {formik.touched.report_type && formik.errors.report_type ? (
            <div>{formik.errors.report_type}</div>
          ) : null}
        </label>

        <label>
          Họ Tên
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.area}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </label>

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

        <label>
          Điện Thoại Liên Lạc
          <input
            type="number"
            name="phone_number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_number.toString()}
          />
          {formik.touched.phone_number && formik.errors.phone_number ? (
            <div>{formik.errors.phone_number}</div>
          ) : null}
        </label>

        <label>
          Nội dung báo cáo
          <input
            type="text"
            name="report_content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.report_content}
          />
          {formik.touched.report_content && formik.errors.report_content ? (
            <div>{formik.errors.report_content}</div>
          ) : null}
        </label>
        <button type="submit">{id ? "Update" : "Add"} Ad Board</button>
      </form>
    </div>
  );
};

export default AdBoardForm;
