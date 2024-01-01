import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const AdBoardForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      location_id: '',
      address: '',
      area: '',
      location_type: '',
      advertising_type: '',
      image_url: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.address) {
        errors.address = 'Required';
      }

      if (!values.area) {
        errors.area = 'Required';
      }

      if (!values.location_type) {
        errors.location_type = 'Required';
      }

      if (!values.advertising_type) {
        errors.advertising_type = 'Required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (id) {
        await axios.put(`/adboards/${id}`, values);
      } else {
        await axios.post('/adboards', values);
      }

      const response = await axios.get('/adboards');
      dispatch({ type: 'SET_AD_BOARDS', payload: response.data });

      navigate('/adboards');
    },
  });

  useEffect(() => {
    const fetchAdBoard = async () => {
      if (id) {
        const response = await axios.get(`/adboards/${id}`);
        formik.setValues(response.data);
      }
    };

    fetchAdBoard();
  }, [id, formik]);

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Ad Board</h2>
      <form onSubmit={formik.handleSubmit}>
      <label>
          Address:
          <input
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div>{formik.errors.address}</div>
          ) : null}
        </label>

        <label>
          Area:
          <input
            type="text"
            name="area"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.area}
          />
          {formik.touched.area && formik.errors.area ? (
            <div>{formik.errors.area}</div>
          ) : null}
        </label>

        <label>
          Location Type:
          <input
            type="text"
            name="location_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location_type}
          />
          {formik.touched.location_type && formik.errors.location_type ? (
            <div>{formik.errors.location_type}</div>
          ) : null}
        </label>

        <label>
          Advertising Type:
          <input
            type="text"
            name="advertising_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.advertising_type}
          />
          {formik.touched.advertising_type && formik.errors.advertising_type ? (
            <div>{formik.errors.advertising_type}</div>
          ) : null}
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image_url}
          />
          {formik.touched.image_url && formik.errors.image_url ? (
            <div>{formik.errors.image_url}</div>
          ) : null}
        </label>
        <button type="submit">{id ? 'Update' : 'Add'} Ad Board</button>
      </form>
    </div>
  );
};

export default AdBoardForm;