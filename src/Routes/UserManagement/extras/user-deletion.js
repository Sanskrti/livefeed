import React from 'react';
import { useDeleteUserMutation } from '../../../Slice';

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id).unwrap();
      onUserDeleted(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete the user "{selectedUser.name}"?</p>
      <button onClick={handleDelete}>Confirm Deletion</button>
    </div>
  );
};

export default UserDeletion;
