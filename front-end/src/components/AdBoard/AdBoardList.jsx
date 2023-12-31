import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import { AppContext } from '../../context/AppContext';

const AdBoardList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAdBoards = async () => {
      const response = await axios.get('/adboards');
      dispatch({ type: 'SET_AD_BOARDS', payload: response.data });
    };

    fetchAdBoards();
  }, [dispatch]);

  return (
    <div>
      <h2>Ad Board List</h2>
      <Link to="/adboards/add">Add Ad Board</Link>
      <table>
        <thead>
          <tr>
            <th>Location ID</th>
            <th>Address</th>
            <th>Area</th>
            <th>Location Type</th>
            <th>Advertising Type</th>
            <th>Image URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.adBoards.map((adBoard) => (
            <tr key={adBoard.id}>
              <td>{adBoard.location_id}</td>
              <td>{adBoard.address}</td>
              <td>{adBoard.area}</td>
              <td>{adBoard.location_type}</td>
              <td>{adBoard.advertising_type}</td>
              <td>{adBoard.image_url}</td>
              <td>
                <Link to={`/adboards/${adBoard.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdBoardList;