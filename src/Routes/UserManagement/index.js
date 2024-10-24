import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, clearSelectedUser } from './features/userSlice';
import UserDeletion from "./extras/user-deletion";
import UserUpdation from "./extras/User-Updation";
import UserCreation from "./extras/user-creation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import s from "./extras/user_creation.module.scss";
import {
  useFetchUsersQuery,
  useLoadAllowedPagesQuery,
  useLoadAllowedActionsQuery,
} from "../../../src/Slice";

const UserManagement = () => {
  const dispatch = useDispatch();
  
  // Fetching users
  const { data: userList, error: userError, isLoading: userLoading, refetch } = useFetchUsersQuery();
  const { data: allowedPages } = useLoadAllowedPagesQuery();
  const { data: allowedActions } = useLoadAllowedActionsQuery();

  const selectedUser = useSelector((state) => state.users.selectedUser);
  
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Debugging logs
  useEffect(() => {
  
    console.log('User Loading:', userLoading);
  }, [userLoading]);

  const handleOpenCreate = () => {
    console.log('Creating user...');
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    console.log('Closed Create User Dialog');
    setOpenCreate(false);
  };

  const handleOpenUpdate = (user) => {
    console.log('Updating user:', user);
    dispatch(selectUser(user));
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    console.log('Closed Update User Dialog');
    setOpenUpdate(false);
    dispatch(clearSelectedUser());
  };

  const handleOpenDelete = (user) => {
    console.log('Deleting user:', user);
    dispatch(selectUser(user));
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    console.log('Closed Delete User Dialog');
    setOpenDelete(false);
    dispatch(clearSelectedUser());
  };

  const handleOpenDetails = (user) => {
    console.log('Viewing details for user:', user);
    setUserDetails(user);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    console.log('Closed User Details Dialog');
    setOpenDetails(false);
    setUserDetails(null);
  };

  return (
    <div className={s.user_management}>
      <h1 className={s.title}>User Management</h1>
      <Button variant="contained" className={s.create_button} onClick={handleOpenCreate}>
        Create User
      </Button>

      {userLoading ? (
        <CircularProgress />
      ) : userError ? (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="error">{userError.message}</Alert>
        </Snackbar>
      ) : (
        <div className={s.userListContainer}>
          <table className={s.user_table}>
            <thead>
              <tr>
                <th>ID</th>
                <th className={s.name_Column}>Name</th>
                <th className={s.canLogin_Column}>Can Login</th>
                <th className={s.action_Column}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.can_login ? 'Yes' : 'No'}</td>
                    <td>
                      <Button variant="outlined" className={s.update_button} onClick={() => handleOpenUpdate(user)}>
                        Update
                      </Button>
                      <Button variant="outlined" className={s.delete_button} onClick={() => handleOpenDelete(user)}>
                        Delete
                      </Button>
                      <Button variant="outlined" className={s.view_button} onClick={() => handleOpenDetails(user)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialogs for Creating, Updating, Deleting, and Viewing User Details */}
      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle className={s.dialog_title}>
          Create User
          <IconButton edge="end" color="inherit" onClick={handleCloseCreate} aria-label="close">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          <UserCreation onUserCreated={refetch} allowedActions={allowedActions} allowedPages={allowedPages} />
        </DialogContent>
      </Dialog>

      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle className={s.dialog_title}>
          Update User
          <IconButton edge="end" color="inherit" onClick={handleCloseUpdate} aria-label="close">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          {selectedUser && (
            <UserUpdation
              selectedUser={selectedUser}
              onUserUpdated={refetch}
              allowedActions={allowedActions}
              allowedPages={allowedPages}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle className={s.dialog_title}>
          Delete User
          <IconButton edge="end" color="inherit" onClick={handleCloseDelete} aria-label="close">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          {selectedUser && (
            <UserDeletion selectedUser={selectedUser} onUserDeleted={refetch} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDetails} onClose={handleCloseDetails}>
        <DialogTitle className={s.dialog_title}>
          User Details
          <IconButton edge="end" color="inherit" onClick={handleCloseDetails} aria-label="close">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          {userDetails && (
            <div>
              <p><strong>ID:</strong> {userDetails.id}</p>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Can Login:</strong> {userDetails.can_login ? 'Yes' : 'No'}</p>
              <h3>Allowed Actions: {userDetails.allowed_actions?.length > 0 ? userDetails.allowed_actions.join(', ') : 'None'}</h3>
              <h3>Allowed Pages: {userDetails.pages?.length > 0 ? userDetails.pages.join(', ') : 'None'}</h3>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
