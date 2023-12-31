import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const DistrictList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await axios.get('/districts');
      dispatch({ type: 'SET_DISTRICTS', payload: response.data });
    };

    fetchDistricts();
  }, [dispatch]);

  return (
    <div>
      <h2>District List</h2>
      <Link to="/districts/add">Add District</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>City</th>
            <th>Description</th>
            <th>Population</th>
            <th>Area</th>
            <th>Special Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.districts.map((district) => (
            <tr key={district.id}>
              <td>{district.name}</td>
              <td>{district.code}</td>
              <td>{district.city}</td>
              <td>{district.description}</td>
              <td>{district.population}</td>
              <td>{district.area}</td>
              <td>{district.specialPoints}</td>
              <td>
                <Link to={`/districts/${district.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistrictList;