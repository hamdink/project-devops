/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { styled } from '@mui/material/styles'
import RequireAuth from 'src/@core/layouts/components/RequireAuth'
import { addAssistantMember,getUsers, deleteUsers } from '../api/appConfig'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

const AddMemberForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4)
}))

const AddMember = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [memberData, setMemberData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    role: '',
    avatar: null,
    avatarUrl: '',
    gender: 'Male', // Default value set to 'Male'
    phoneNumber: '',
    password: '',
    confirmPassword:''
  })
  const [users, setUsers] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState('');

  const router = useRouter()

  useEffect(() => {
    if (data) {
      setMemberData({ ...data, avatarUrl: data.avatar })
    } else {
      setMemberData({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        role: '',
        avatar: null,
        avatarUrl: '',
        gender: 'Male', // Default value set to 'Male'
        phoneNumber: '',
        password: '',
        confirmPassword:''
      })
    }
  }, [data])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers()
        setUsers(usersData)
      } catch (error) {
        toast.error('Failed to fetch users')
      }
    }

    fetchUsers()
  }, [])

  const handleAvatarChange = (e) => {
    const avatarFile = e.target.files[0]
    if (avatarFile) {
      const avatarUrl = URL.createObjectURL(avatarFile)
      setMemberData((prevData) => ({ ...prevData, avatar: avatarFile, avatarUrl }))
    }
  }
  const handleOpenDeleteDialog = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update memberData state
    setMemberData((prevData) => ({ ...prevData, [name]: value }));

    // Email validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setEmailError('');
      } else {
        setEmailError('Please enter a valid email address');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { firstName, lastName, email, birthDate, role, avatar, gender, phoneNumber, password, confirmPassword } = memberData
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.length < 8 || password.length > 20) {
      toast.error('Password must be between 8 and 20 characters')
      return
    }
    try {
      if (!data) {
        await addAssistantMember({
          firstName,
          lastName,
          email,
          birthDate,
          role,
          avatar,
          gender,
          phoneNumber,
          password,
          confirmPassword
        })
        router.push('/dashboard')
        toast.success('Member added successfully')
      }
    } catch (error) {
      toast.error('Failed to add member')
    }
  }
  

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteUsers(itemToDelete);
        setUsers(users.filter((user) => user._id !== itemToDelete));
         handleCloseDeleteDialog();
      } catch (error) {
        console.error('Failed to delete contact', error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  return (
    <RequireAuth>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Add Member" />
        <Tab label="Manage Members" />
      </Tabs>
      <Card>
        {tabIndex === 0 && (
          <AddMemberForm component='form' onSubmit={handleSubmit}>
            <TextField
              label='First Name'
              name='firstName'
              value={memberData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label='Last Name'
              name='lastName'
              value={memberData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label='Email'
              name='email'
              type='email'
              value={memberData.email}
              onChange={handleChange}
              required
              helperText={emailError}
              error={!!emailError}
            />
            <TextField
              label='Birth Date'
              name='birthDate'
              type='date'
              value={memberData.birthDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <Select
  label='Role'
  name='role'
  value={memberData.role || ''}
  onChange={handleChange}
  displayEmpty
  required
>
  <MenuItem value="" disabled>
    Select Role
  </MenuItem>
  <MenuItem value='Admin'>Admin</MenuItem>
  <MenuItem value='Assistant'>Assistant</MenuItem>
</Select>
            <Select
              label='Gender'
              name='gender'
              value={memberData.gender}
              onChange={handleChange}
              required
            >
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
            <TextField
              label='Phone Number'
              name='phoneNumber'
              value={memberData.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              label='Password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={memberData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            <TextField
              label='Confirm password'
              name='confirmPassword'
              type={showConfPassword ? 'text' : 'password'}
              value={memberData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowConfPassword}
                    edge='end'
                  >
                    {showConfPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            <Box marginBottom={2}>
              <Input type='file' name='avatar' accept='image/*' onChange={handleAvatarChange} />
              {memberData.avatarUrl && (
                <img src={memberData.avatarUrl} alt='Preview' style={{ width: '50px', height: '50px', marginTop: '10px' }} />
              )}
            </Box>
            <Button variant='contained' type='submit'>Add Member</Button>
          </AddMemberForm>
        )}
        {tabIndex === 1 && (
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
             <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <Button

                    onClick={() => handleOpenDeleteDialog(user._id)}
                  >
                    Delete
                  </Button>
              </TableRow>
            ))}
             </TableBody>
            </Table>
          </TableContainer>
        )}
        <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      </Card>
    </RequireAuth>
  )
}

export default AddMember
