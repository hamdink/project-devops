import React, { useEffect, useState } from 'react';
import { getUsers,destroyUser } from 'src/pages/api/appConfig';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link'

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        console.log(response)
        setUsers(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    }
    fetchUsers();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 300},
    { field: 'username', headerName: 'Nom', width: 250 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'role', headerName: 'Rôle', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>

          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleOpenDeleteDialog(params.row)}
            >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleEdit = (userId) => {

  };

  const handleDelete = async (userId) => {
    try {

      await destroyUser(userId);

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      handleCloseDeleteDialog();

    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  return (
    <div style={{ height: 600 ,width:'100%', overflowX: 'auto'}}>
 <div style={{ minWidth: '500px' }}>

        <Link href={`/pages/register`} passHref>
          <Button variant="contained" color="primary" style={{ marginBottom:'20px' }}>
          Create New User
          </Button>
        </Link>

        <DataGrid rows={users} columns={columns} getRowId={(row) => row._id}  initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSize={5} />
      </div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {userToDelete?.username} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
          Cancel
          </Button>
          <Button onClick={() => handleDelete(userToDelete?._id)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
       </div>
  );
};

export default TableUsers;
