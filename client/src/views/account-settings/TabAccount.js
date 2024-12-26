// ** React Imports
import { useState, useEffect } from 'react'
import { fetchUserData , updateUserProfile,logout } from 'src/pages/api/appConfig'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    id:'',
  });
  const userId = formData ? formData.id : null;

  const fetchData = async () => {
    try {
      const data = await fetchUserData();
      setFormData(data);

    } catch (error) {
      console.error('Erreur lors de la récupération des détails user :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = async (e) => {
      e.preventDefault();
      try {
        const updatedData = await updateUserProfile(userId, formData);
        
        setFormData(updatedData);

        await logout();
        localStorage.removeItem('accessToken');
        window.location.href = '/pages/login';
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    };

  return (

    <CardContent>
      <form onSubmit={handleUpdateProfile}>
        <Grid container spacing={7} sx={{ marginTop: 4 }}>

          <Grid item xs={12} sm={6} >
          <TextField
              fullWidth
              label='Username'
              name='username'
              type='text'
              value={formData.username}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              name='email'
              label='Email'
              value={formData.email}
              onChange={handleFormChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button  type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
