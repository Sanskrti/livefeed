import { axiosClient, userListEndpoint, createUserEndpoint, updateUserEndpoint, deleteUserEndpoint } from '../../../api/axiosClient';

export const fetchUsers = async (setUsers, setError) => {
  try {
    const response = await axiosClient.get(userListEndpoint);
    setUsers(response.data);
  } catch (error) {
    setError('Error fetching users: ' + error.message);
  }
};

export const handleCreateUser = async (e, newUser, setError, setLoading, setUsers, setCreateModalOpen) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axiosClient.post(createUserEndpoint, newUser);
    setUsers((prevUsers) => [...prevUsers, response.data]);
    setCreateModalOpen(false);
  } catch (error) {
    setError('Error creating user: ' + error.message);
  } finally {
    setLoading(false);
  }
};

export const handleUpdateUser = async (viewUser, updatedUser, setError, setLoading, setUsers, setUpdateModalOpen) => {
  setLoading(true);
  try {
    const response = await axiosClient.put(updateUserEndpoint(viewUser.id), updatedUser);
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === viewUser.id ? response.data : user)));
    setUpdateModalOpen(false);
  } catch (error) {
    setError('Error updating user: ' + error.message);
  } finally {
    setLoading(false);
  }
};

export const handleDeleteUser = async (userId, setUsers, setError) => {
  try {
    await axiosClient.delete(deleteUserEndpoint(userId));
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  } catch (error) {
    setError('Error deleting user: ' + error.message);
  }
};
