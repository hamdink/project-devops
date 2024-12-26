//import FormLayoutsAlignment from 'views/form-layouts/FormLayoutsAlignment'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Grid from '@mui/material/Grid'

const Client = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          {/* <FormLayoutsAlignment /> */}
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Client
