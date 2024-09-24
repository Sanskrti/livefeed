import { apiClient } from '../../../api/apiClient';
import { userListEndpoint, createUserEndpoint, updateUserEndpoint, deleteUserEndpoint } from '../../../api/endpoints'; 

export const fetchUsers = async (setUsers, setError) => {
  try {
    const response = await apiClient.get(userListEndpoint);
    if (response.status === 200) {
      setUsers(response.data);
    } else {
      setError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    setError(`Error fetching users: ${err.message}`);
  }
};

export const handleCreateUser = async (e, newUser, setCreateError, setSuccessMessage, setUsers, closeModal) => {
  try {
    const response = await apiClient.post(createUserEndpoint, newUser);
    if (response.status === 201) {
      setSuccessMessage('User created successfully!');
      await fetchUsers(setUsers, setCreateError); 
      closeModal();
    } else {
      setCreateError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    setCreateError(`Error creating user: ${err.message}`);
  }
};

export const handleUpdateUser = async (e, selectedUser, newUser, setCreateError, setSuccessMessage, closeModal, setUsers) => {
  try {
    const response = await apiClient.put(updateUserEndpoint(selectedUser.id), newUser);
    if (response.status === 200) {
      setSuccessMessage('User updated successfully!');
      await fetchUsers(setUsers, setCreateError); 
      closeModal();
    } else {
      setCreateError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    setCreateError(`Error updating user: ${err.message}`);
  }
};

export const handleDeleteUser = async (id, setUsers, setSuccessMessage, setError) => {
  if (!window.confirm('Are you sure you want to delete this user?')) {
    return;
  }
  try {
    const response = await apiClient.delete(deleteUserEndpoint(id));
    if (response.status === 200) {
      setSuccessMessage('User deleted successfully!');
      await fetchUsers(setUsers, setError); 
    } else {
      setError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    setError(`Error deleting user: ${err.message}`);
  }
};
