// ** React Imports
import { useState, useEffect } from 'react'
import { fetchUserData, updatePassword } from 'src/pages/api/appConfig'
import { isLength } from 'validator'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const TabSecurity = () => {
  const [error, setError] = useState(null)

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })
  const [userId, setUserId] = useState(null)
  const [PasswordError, setPasswordError] = useState('')
  const [Password, setPassword] = useState('')

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  //effect pour recuperer les donnes

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserData()

        if (userData) {
          setUserId(userData._id)
        } else {
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error)
      }
    }

    fetchData()
  }, [])

  //handle submit

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      if (values.newPassword !== values.confirmNewPassword) {
        setError('Les nouveaux mots de passe ne correspondent pas.')

        return
      }

      try {
        const updatedData = {
          userId: userId,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword
        }

        await updatePassword(userId, updatedData)

        setValues({
          ...values,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setError(null)

        console.log('Mot de passe mis à jour avec succès')
      } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error)

        setError('An Error Occured, Try again')
      }
    }
  }

  const validateFields = () => {
    let isValid = true

    setPasswordError('')

    // Valider le champ password
    if (values.newPassword.trim() === '') {
      setPasswordError('Password is required')
      isValid = false
    } else if (!isLength(values.newPassword, { min: 8, max: 20 })) {
      setPasswordError('Password must be between 8 and 20 characters')
      isValid = false
    }

    return isValid
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    error={!!PasswordError}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {PasswordError && (
                    <Typography variant='caption' color='error'>
                      {PasswordError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    error={!!PasswordError}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {PasswordError && (
                    <Typography variant='caption' color='error'>
                      {PasswordError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
        {error && <Typography color='error'>{error}</Typography>}
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box sx={{ mt: 6 }}>
          <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
