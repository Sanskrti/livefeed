import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserDeletion from './extras/user-deletion';
import UserUpdation from './extras/User-Updation';
import UserCreation from './extras/user-creation';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import s from "./extras/user_creation.module.scss";
import {
  useFetchUsersQuery,
  useLoadAllowedPagesQuery,
  useLoadAllowedActionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../src/Slice";
import { selectUser, clearSelectedUser } from './features/userSlice';

const UserManagement = () => {
  const dispatch = useDispatch();

  const { data: userList, error: userError, isLoading: userLoading, refetch } = useFetchUsersQuery();
  const { data: allowedPages, error: pagesError, isLoading: pagesLoading } = useLoadAllowedPagesQuery();
  const { data: allowedActions, error: actionsError, isLoading: actionsLoading } = useLoadAllowedActionsQuery();

  const [createUser, { isLoading: isCreating, error: createError }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting, error: deleteError }] = useDeleteUserMutation();

  const selectedUser = useSelector((state) => state.users.selectedUser);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!userLoading && userList) {
      console.log('Fetched Users:', userList);
    }
  }, [userLoading, userList]);

  useEffect(() => {
    if (!pagesLoading && allowedPages) {
      console.log('Fetched Allowed Pages:', allowedPages);

    }
  }, [pagesLoading, allowedPages]);

  useEffect(() => {
    if (!actionsLoading && allowedActions) {
      console.log('Fetched Allowed Actions:', allowedActions);
    }
  }, [actionsLoading, allowedActions]);


  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenUpdate = (user) => {
    dispatch(selectUser(user));
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    dispatch(clearSelectedUser());
  };
  const handleOpenDelete = (user) => {
    dispatch(selectUser(user));
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    dispatch(clearSelectedUser());
  };
  const handleOpenDetails = (user) => {
    setUserDetails(user);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
    setUserDetails(null);
  };

  const handleUserCreated = async (newUser) => {
    try {
      await createUser(newUser).unwrap();
      handleCloseCreate();
      refetch(); 
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

 
  const handleUserUpdated = async (updatedUser) => {
    try {
      await updateUser({ id: selectedUser.id, ...updatedUser }).unwrap();
      handleCloseUpdate();
      refetch(); 
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };


  const handleUserDeleted = async () => {
    try {
      await deleteUser(selectedUser.id).unwrap();
      handleCloseDelete();
      refetch(); 
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
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
        <p style={{ color: 'red' }}>{userError}</p>
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
              {userList.map((user) => (
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle className={s.dialog_title}>
          Create User
          <IconButton edge="end" color="inherit" onClick={handleCloseCreate} aria-label="close">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          <UserCreation onUserCreated={handleUserCreated} />
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
              onUserUpdated={handleUserUpdated}
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
            <UserDeletion selectedUser={selectedUser} onUserDeleted={handleUserDeleted} />
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
              <h3>ID: {userDetails.id}</h3>
              <h3>Name: {userDetails.name}</h3>
              <h3>Can Login: {userDetails.can_login ? 'Yes' : 'No'}</h3>
              <h3>Allowed Pages: {userDetails.allowedPages}</h3>
              <h3>Allowed Actions: {userDetails.allowedActions}</h3> 
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;

