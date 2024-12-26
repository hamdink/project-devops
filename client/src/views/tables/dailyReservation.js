import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid' // Importez DataGrid depuis @mui/x-data-grid
// import { dailyReservationStats } from 'src/pages/api/appConfig'
import { format } from 'date-fns'
import { Typography } from '@mui/material'

const ReservationTable = () => {
  const [data, setData] = useState([])

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await dailyReservationStats()
  //       setData(response)
  //     } catch (error) {
  //       console.error('Failed to fetch data', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    { field: 'passengerNumber', headerName: 'Passenger Number', width: 150 },
    { field: 'startDestination', headerName: 'Start Destination', width: 200 },
    { field: 'endDestination', headerName: 'End Destination', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueGetter: params => {
        const reservationDate = new Date(params.row.date)
        const today = new Date()

        if (
          reservationDate.getDate() === today.getDate() &&
          reservationDate.getMonth() === today.getMonth() &&
          reservationDate.getFullYear() === today.getFullYear()
        ) {
          return 'Today'
        }

        return format(reservationDate, 'dd/MM/yyyy')
      }
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 150,
      valueGetter: params => {
        const time = new Date(params.row.time)

        return format(time, 'HH:mm')
      }
    },
    { field: 'message', headerName: 'Message', width: 400 },
    { field: 'isRoundTrip', headerName: 'Round Trip', width: 150 }
  ]

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <Typography variant='h6' gutterBottom>
        Today's Messages Dashboard{' '}
      </Typography>
      {data.length === 0 ? (
        <Typography variant='body1'> No new messages today! It's a quiet day 🌞</Typography>
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          getRowId={row => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default ReservationTable
