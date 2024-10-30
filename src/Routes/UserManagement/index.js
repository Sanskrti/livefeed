import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { selectUser, clearSelectedUser } from './Reducers/userSlice'; 
import UserDeletion from "./extras/user-deletion"; 
import UserUpdation from "./extras/User-Updation";
import UserCreation from "./extras/user-creation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'; 
import { CloseOutlined } from '@mui/icons-material'; 
import s from "./extras/user_creation.module.scss"; 
import {
  useFetchUsersQuery,
  useLoadAllowedPagesQuery,
  useLoadAllowedActionsQuery,
} from "./Reducers/apiSlices/Slice"; 

const UserManagement = () => {
  const dispatch = useDispatch();
  
  const { data: userList, error: userError, isLoading: userLoading, refetch } = useFetchUsersQuery();
  const { data: allowedPages } = useLoadAllowedPagesQuery(); 
  const { data: allowedActions } = useLoadAllowedActionsQuery(); 

  const selectedUser = useSelector((state) => state.users.selectedUser);
  
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false); 
  const [openDelete, setOpenDelete] = useState(false); 
  const [openDetails, setOpenDetails] = useState(false); 
  const [userDetails, setUserDetails] = useState(null); 

  useEffect(() => {
    console.log('User Loading:', userLoading); 
  }, [userLoading]);

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

  return (
    <div className={s.user_management}>
      <h1 className={s.title}>User Management</h1>
      <button className={s.create_button} onClick={handleOpenCreate}>
        Create User
      </button>

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
                      <button className={s.update_button} onClick={() => handleOpenUpdate(user)}>
                        Update
                      </button>
                      <button className={s.delete_button} onClick={() => handleOpenDelete(user)}>
                        Delete
                      </button>
                      <button className={s.view_button} onClick={() => handleOpenDetails(user)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={openCreate} onClose={handleCloseCreate}>
        <DialogTitle className={s.dialog_title}>
          Create User
          <IconButton edge="end" onClick={handleCloseCreate} aria-label="close">
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
          <IconButton edge="end" onClick={handleCloseUpdate} aria-label="close">
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
          <IconButton edge="end" onClick={handleCloseDelete} aria-label="close">
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
          <IconButton edge="end" onClick={handleCloseDetails} aria-label="close">
            <CloseOutlined /> 
          </IconButton>
        </DialogTitle>
        <DialogContent className={s.dialog_content}>
          {userDetails && (
            <div>
              <h3><strong>ID:</strong> {userDetails.id}</h3>
              <h3><strong>Name:</strong> {userDetails.name}</h3>
              <h3><strong>Can Login:</strong> {userDetails.can_login ? 'Yes' : 'No'}</h3>
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
