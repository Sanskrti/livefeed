import axios from 'axios';
import { userDetailEndpoint, updateUserEndpoint, deleteUserEndpoint, userListEndpoint } from '../../../api/apiClient';

export const fetchUserDetail = async (id, setSelectedUser, setUserDetailError, setLoadingUserDetail) => {
  setLoadingUserDetail(true);
  setSelectedUser(null);
  try {
    const response = await axios.get(userDetailEndpoint(id));
    if (response.status === 200) {
      setSelectedUser(response.data);
      setUserDetailError(null);
    } else {
      setUserDetailError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    handleError(err, setUserDetailError);
  } finally {
    setLoadingUserDetail(false);
  }
};

export const handleUpdateUser = async (e, selectedUser, newUser, setCreateError, setSuccessMessage, setIsModalOpen, setUsers) => {
  e.preventDefault();
  setCreateError(null);
  setSuccessMessage(null);

  const { name, password } = newUser;
  if (!name || !password) {
    setCreateError('Both name and password are required.');
    return;
  }

  try {
    const response = await axios.put(updateUserEndpoint(selectedUser.id), { name, password });
    if (response.status === 200) {
      setSuccessMessage('User updated successfully!');
      setIsModalOpen(false);
      const updatedUsers = await axios.get(userListEndpoint);
      setUsers(updatedUsers.data);
    } else {
      setCreateError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    handleError(err, setCreateError);
  }
};

export const handleDeleteUser = async (id, users, setUsers, setSuccessMessage, setError) => {
  if (!window.confirm('Are you sure you want to delete this user?')) {
    return;
  }

  try {
    const response = await axios.delete(deleteUserEndpoint(id));
    if (response.status === 200) {
      setUsers(users.filter((user) => user.id !== id));
      setSuccessMessage('User deleted successfully!');
    } else {
      setError(`Unexpected status code: ${response.status}`);
    }
  } catch (err) {
    handleError(err, setError);
  }
};

const handleError = (err, setErrorCallback) => {
  if (err.response) {
    setErrorCallback(`Server error: ${err.response.status} - ${err.response.statusText}`);
  } else if (err.request) {
    setErrorCallback('No response received from server. Please check your network connection.');
  } else {
    setErrorCallback(`Error in request: ${err.message}`);
  }
};
