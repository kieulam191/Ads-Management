import React, { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const DistrictForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      city: '',
      description: '',
      population: 0,
      area: 0,
      specialPoints: '',
    },
    validate: (values) => {
      const errors = {};
    
      if (!values.name) {
        errors.name = 'Required';
      }
    
      if (!values.code) {
        errors.code = 'Required';
      }
    
      if (!values.city) {
        errors.city = 'Required';
      }
    
      if (!values.population) {
        errors.population = 'Required';
      } else if (values.population < 0) {
        errors.population = 'Population must be a positive number';
      }
    
      if (!values.area) {
        errors.area = 'Required';
      } else if (values.area < 0) {
        errors.area = 'Area must be a positive number';
      }
    
      return errors;
    },
    onSubmit: async (values) => {
      if (id) {
        await axios.put(`/districts/${id}`, values);
      } else {
        await axios.post('/districts', values);
      }

      const response = await axios.get('/districts');
      dispatch({ type: 'SET_DISTRICTS', payload: response.data });

      history.push('/districts');
    },
  });

  useEffect(() => {
    const fetchDistrict = async () => {
      if (id) {
        const response = await axios.get(`/districts/${id}`);
        formik.setValues(response.data);
      }
    };

    fetchDistrict();
  }, [id, formik]);

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} District</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          District Name:
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

        <label>
          District Code:
          <input
            type="text"
            name="code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <div>{formik.errors.code}</div>
          ) : null}
        </label>

        <label>
          City/Province:
          <input
            type="text"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}
        </label>

        <label>
          Description:
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </label>

        <label>
          Population:
          <input
            type="number"
            name="population"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.population}
          />
          {formik.touched.population && formik.errors.population ? (
            <div>{formik.errors.population}</div>
          ) : null}
        </label>

        <label>
          Area:
          <input
            type="number"
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
          Special Points:
          <input
            type="text"
            name="specialPoints"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialPoints}
          />
          {formik.touched.specialPoints && formik.errors.specialPoints ? (
            <div>{formik.errors.specialPoints}</div>
          ) : null}
        </label>

        <button type="submit">{id ? 'Update' : 'Add'} District</button>
      </form>
    </div>
  );
};

export default DistrictForm;