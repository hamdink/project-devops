import { useState } from 'react'
import { useRouter } from 'next/router'
import { isLength } from 'validator'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { resetPassword } from 'src/pages/api/appConfig'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPasswordPage = () => {
  const router = useRouter()
  const { token } = router.query

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      try {
        await resetPassword(token, password)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const validateFields = () => {
    setPasswordError('')
    setConfirmPasswordError('')

    let isValid = true

    if (!isLength(password, { min: 8, max: 20 })) {
      setPasswordError('Password must be between 8 and 20 characters')
      isValid = false
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      isValid = false
    }

    return isValid
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`/images/alibabalogo.png
            `} alt='logo' style={{ width: '150px', height: 'auto' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Reset Password
            </Typography>
            <Typography variant='body2'>Enter your new password and confirm it.</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              required
              autoFocus
              fullWidth
              id='password'
              label='New Password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              sx={{ marginBottom: 4 }}
            />

            <TextField
              required
              fullWidth
              id='confirmPassword'
              label='Confirm New Password'
              type='password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              sx={{ marginBottom: 4 }}
            />

            {error && <Typography color='error'>{error}</Typography>}

            <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginTop: 7 }}>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ResetPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ResetPasswordPage
