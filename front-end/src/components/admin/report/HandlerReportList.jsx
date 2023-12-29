import React from "react";

const HandlerReportList = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await axios.get("/accounts");
      dispatch({ type: "SET_HANDLER_REPORTS", payload: response.data });
    };

    fetchAccount();
  }, [dispatch]);

  return (
    <div>
      <h2>Handler Report</h2>
      <Link to="/adboards/add">Add Ad Board</Link>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>fullname</th>
            <th>birthday</th>
            <th>email</th>
            <th>phone_number</th>
            <th>role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.accounts.map((adBoard) => (
            <tr key={adBoard.user_id}>
              <td>{adBoard.username}</td>
              <td>{adBoard.fullname}</td>
              <td>{adBoard.birthday}</td>
              <td>{adBoard.email}</td>
              <td>{adBoard.role}</td>
              {/* <td>{adBoard.image_url}</td> */}
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

export default HandlerReportList;
