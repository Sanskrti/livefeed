import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { userListEndpoint } from "../../api/axiosClient";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axiosClient.get(userListEndpoint);
      setUserList(response.data);
    } catch (error) {
      setError("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      user list
      {userList.map((item, index) => (
        <div key={index}>
          <div onClick={() => setSelectedUser(item)}>{item.name}</div>
        </div>
      ))}
      <UserDeletion
        selectedUser={selectedUser || {}}
        onUserDeleted={fetchUsers}
      />
      <UserUpdation
        selectedUser={selectedUser || {}}
        onUserUpdated={fetchUsers}
        dialogOpen={selectedUser ? true : false}
      />
    </div>
  );
};

export default UserManagement;
