import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// import {
//   countAcceptedReservations,
//   countRejectedReservations,
//   countTotalReservations,
//   countPendingReservations
// } from 'src/pages/api/appConfig'

{
  /**const RenderStats = () => {

  const [totalReservations, setTotalReservations] = useState(0);
  const [acceptedReservations, setAcceptedReservations] = useState(0);
  const [rejectedReservations, setRejectedReservations] = useState(0);

  useEffect(() => {
    // Utilisez les fonctions d'appel API ici pour obtenir les données
    const fetchData = async () => {
      try {
        const totalResponse = await countTotalReservations();
        const acceptedResponse = await countAcceptedReservations();
        const rejectedResponse = await countRejectedReservations();
console.log(totalResponse);
console.log(acceptedResponse);
console.log(rejectedResponse);


        setTotalReservations(totalResponse.data);
        setAcceptedReservations(acceptedResponse.data);
        setRejectedReservations(rejectedResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
    fetchData();
  }, []);



  const salesData = [
    {
      stats: totalReservations,
      title: 'Total ',
      color: 'primary',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: acceptedReservations,
      title: 'Accepted',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: rejectedReservations,
      color: 'warning',
      title: 'Rejected',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },

  ]





  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}*/
}

const StatisticsCard = () => {
  const [totalReservations, setTotalReservations] = useState(0)
  const [acceptedReservations, setAcceptedReservations] = useState(0)
  const [rejectedReservations, setRejectedReservations] = useState(0)
  const [pendingReservations, setPendingReservations] = useState(0)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const totalResponse = await countTotalReservations()
  //       // const acceptedResponse = await countAcceptedReservations()
  //       // const rejectedResponse = await countRejectedReservations()
  //       // const pendingResponse = await countPendingReservations()
  //       // setTotalReservations(totalResponse)
  //       // setAcceptedReservations(acceptedResponse)
  //       // setRejectedReservations(rejectedResponse)
  //       // setPendingReservations(pendingResponse)
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des données :', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <Card>
      <CardHeader title='Messages Stats ' />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {[
            {
              stats: totalReservations,
              title: 'Total',
              color: 'primary',
              icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
            } // {
            //   stats: acceptedReservations,
            //   title: 'Accepted',
            //   color: 'success',
            //   icon: <CheckCircleIcon sx={{ fontSize: '1.75rem' }} />,
            // },
            // {
            //   stats: rejectedReservations,
            //   title: 'Rejected',
            //   color: 'error',
            //   icon: <CancelIcon sx={{ fontSize: '1.75rem' }} />,
            // },
            // {
            //   stats: pendingReservations,
            //   title: 'Pending',
            //   color:'warning',
            //   icon: <AccessTimeIcon sx={{ fontSize: '1.75rem'  }} />,
            // },
          ].map((item, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: 'common.white',
                    backgroundColor: `${item.color}.main`
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption'>{item.title}</Typography>
                  <Typography variant='h6'>{item.stats}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
