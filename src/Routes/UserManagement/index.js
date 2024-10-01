import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";
import { userListEndpoint } from "../../api/axiosClient";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

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

  const handleUserCreated = (newUser) => {
    setUserList(prevUsers => [...prevUsers, newUser]);
    setIsCreatingUser(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUserList(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleUserDelete = (userId) => {
    setUserList(prevUsers => prevUsers.filter(user => user.id !== userId));
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={() => setIsCreatingUser(true)}>Create New User</button>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Can Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.can_login ? "Yes" : "No"}</td>
              <td>
                <UserUpdation
                  selectedUser={selectedUser}
                  onUserUpdated={handleUserUpdated}
                  dialogOpen={selectedUser && selectedUser.id === item.id}
                />
                <button onClick={() => setSelectedUser(item)}>View Details</button>
                <UserDeletion
                  selectedUser={item} 
                  onUserDeleted={() => handleUserDelete(item.id)}
                />
                <button onClick={() => setSelectedUser(item)}>Update User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isCreatingUser && (
        <UserCreation
          dialogOpen={isCreatingUser}
          onUserCreated={handleUserCreated}
        />
      )}
    </div>
  );
};

export default UserManagement;
