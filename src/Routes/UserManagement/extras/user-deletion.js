import React from 'react'; 
import { useDeleteUserMutation } from '../Reducers/apiSlices/Slice'; 
import s from "./user_creation.module.scss"; 

const UserDeletion = ({ selectedUser, onUserDeleted }) => {
  // Destructuring props: `selectedUser` (the user to be deleted) and `onUserDeleted` (callback after deletion).
  
  const [deleteUser] = useDeleteUserMutation(); 
  // `deleteUser` is a function that allows sending a delete request for a user using the mutation provided by the Redux slice.

  const handleDelete = async () => {
    // This function handles the delete operation asynchronously.
    try {
      await deleteUser(selectedUser.id).unwrap(); 
      // Sending the delete request with the user's ID and using `.unwrap()` to get the result or throw an error.
      onUserDeleted(); 
      
    } catch (error) {
      console.error('Error deleting user:', error); 
      
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete the user "{selectedUser.name}"?</p>
      
      
      <button className={s.submit_button} onClick={handleDelete}>Confirm Deletion</button>
     
    </div>
  );
};

export default UserDeletion; 

