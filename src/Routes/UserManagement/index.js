import { axiosClient } from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { userListEndpoint } from "../../api/axiosClient";
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/user-updation";
import UserCreation from "./extras/user-creation";

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
    setUserList((prevUsers) => [...prevUsers, newUser]);
    setIsCreatingUser(false);
  };

  const handleUserUpdated = (updatedUser) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
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
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => (
            <tr key={index} onClick={() => setSelectedUser(item)}>
              <td>{item.name}</td>
              <td>{item.can_login ? "Yes" : "No"}</td>
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
      {selectedUser && (
        <>
          <UserUpdation
            selectedUser={selectedUser}
            onUserUpdated={handleUserUpdated}
            dialogOpen={!!selectedUser}
          />
          <UserDeletion
            selectedUser={selectedUser}
            onUserDeleted={() => {
              setUserList((prevUsers) =>
                prevUsers.filter((user) => user.id !== selectedUser.id)
              );
              setSelectedUser(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;

