import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser,
  clearSelectedUser,
} from './features/userSlice';
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
import { useFetchUsersQuery, useLoadAllowedPagesQuery, useLoadAllowedActionsQuery } from "../../../src/Slice";


const UserManagement = () => {
  const dispatch = useDispatch();
  
  
 
  const { data: userList, error: userError, isLoading: userLoading, refetch } = useFetchUsersQuery();
  const { data: allowedPages, error: pagesError, isLoading: pagesLoading } = useLoadAllowedPagesQuery();
  const { data: allowedActions, error: actionsError, isLoading: actionsLoading } = useLoadAllowedActionsQuery();

  const selectedUser = useSelector((state) => state.users.selectedUser);

  
  useEffect(() => {
    if (userList) {
      console.log('User List:', userList);
    }
    if (allowedPages) {
      console.log('Allowed Pages:', allowedPages);
    }
    if (allowedActions) {
      console.log('Allowed Actions:', allowedActions);
    }
  }, [userList, allowedPages, allowedActions]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

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

 
  const handleUserCreated = () => {
    handleCloseCreate(); 
    refetch(); 
  };

  
  const handleUserUpdated = () => {
    handleCloseUpdate(); 
    refetch(); 
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
            <UserDeletion selectedUser={selectedUser} onUserDeleted={handleCloseDelete} />
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