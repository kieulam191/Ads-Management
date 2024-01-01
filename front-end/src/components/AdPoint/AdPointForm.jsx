import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const AdPointForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      board_id: '',
      location_id: '',
      board_type: '',
      size: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.board_type) {
        errors.board_type = 'Required';
      }

      if (!values.size) {
        errors.size = 'Required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (id) {
        await axios.put(`/adpoints/${id}`, values);
      } else {
        await axios.post('/adpoints', values);
      }

      const response = await axios.get('/adpoints');
      dispatch({ type: 'SET_AD_POINTS', payload: response.data });

      history.push('/adpoints');
    },
  });

  useEffect(() => {
    const fetchAdPoint = async () => {
      if (id) {
        const response = await axios.get(`/adpoints/${id}`);
        formik.setValues(response.data);
      }
    };

    fetchAdPoint();
  }, [id, formik]);

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Ad Point</h2>
      <form onSubmit={formik.handleSubmit}>
      <label>
          Board Type:
          <input
            type="text"
            name="board_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.board_type}
          />
          {formik.touched.board_type && formik.errors.board_type ? (
            <div>{formik.errors.board_type}</div>
          ) : null}
        </label>

        <label>
          Size:
          <input
            type="text"
            name="size"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.size}
          />
          {formik.touched.size && formik.errors.size ? (
            <div>{formik.errors.size}</div>
          ) : null}
        </label>
        <button type="submit">{id ? 'Update' : 'Add'} Ad Point</button>
      </form>
    </div>
  );
};

export default AdPointForm;