import { useState } from 'react'
import Link from 'next/link'
import { isEmail } from 'validator'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { forgetPassword } from 'src/pages/api/appConfig'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateEmail()) {
      try {
        await forgetPassword(email)
        
      } catch (error) {
        
      }
      console.log(email)
    }
  }

  const validateEmail = () => {
    setEmailError('')

    if (email.trim() === '') {
      setEmailError('Email is required')

      return false
    } else if (!isEmail(email)) {
      setEmailError('Invalid email format')

      return false
    }

    return true
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`/images/logos/alibabalog.png`} alt='logo' style={{ width: '30%', height: 'auto' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Forgot Password
            </Typography>
            <Typography variant='body2'>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              required
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ marginBottom: 4 }}
            />

            {error && <Typography color='error'>{error}</Typography>}

            <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginTop: 7 }}>
              Send Reset Link
            </Button>

            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
              <Link href='/pages/login' passHref>
                <LinkStyled>Back to Login</LinkStyled>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPasswordPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPasswordPage
