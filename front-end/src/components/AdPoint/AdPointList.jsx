import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const AdPointList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAdPoints = async () => {
      const response = await axios.get('/adpoints');
      dispatch({ type: 'SET_AD_POINTS', payload: response.data });
    };

    fetchAdPoints();
  }, [dispatch]);

  return (
    <div>
      <h2>Ad Point List</h2>
      <Link to="/adpoints/add">Add Ad Point</Link>
      <table>
        <thead>
          <tr>
            <th>Board ID</th>
            <th>Location ID</th>
            <th>Board Type</th>
            <th>Size</th>
            <th>Is Delete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.adPoints.map((adPoint) => (
            <tr key={adPoint.id}>
              <td>{adPoint.board_id}</td>
              <td>{adPoint.location_id}</td>
              <td>{adPoint.board_type}</td>
              <td>{adPoint.size}</td>
              <td>{adPoint.is_delete ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/adpoints/${adPoint.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdPointList;