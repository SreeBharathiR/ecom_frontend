import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserList;
