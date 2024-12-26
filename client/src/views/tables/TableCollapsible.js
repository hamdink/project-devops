import React, { useState, useEffect, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// import { getAllReservation } from 'src/pages/api/appConfig';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Toolbar from '@mui/material/Toolbar'
import ToggleButton from '@mui/material/ToggleButton'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import PaginationComponent from '../pagination/pagination'

const initialColumns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
  { id: 'startDestination', label: 'Start Destination', minWidth: 170 },
  { id: 'endDestination', label: 'End Destination', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: value => (
      <Chip
        label={value}
        color={value === 'accepte' ? 'success' : value === 'refuse' ? 'error' : 'info'}
        sx={{
          height: 24,
          fontSize: '0.75rem',
          textTransform: 'capitalize',
          '& .MuiChip-label': { fontWeight: 500 }
        }}
      />
    )
  }
]

const additionalColumns = [
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'passengerNumber', label: 'Passenger Number', minWidth: 170 },
  { id: 'time', label: 'Time', minWidth: 70 },
  { id: 'message', label: 'Message', maxWidth: 80 },
  { id: 'isRoundTrip', label: 'isRoundTrip', minWidth: 100 },
  { id: 'baggageCount', label: 'baggage Number', minWidth: 170 }
]

const createData = reservation => {
  return {
    reservation,

    history: [
      {
        label: 'Email',
        value: reservation.email
      },

      {
        label: 'Passenger Number',
        value: reservation.passengerNumber
      },

      {
        label: 'Time',
        value: reservation.time
      },
      {
        label: 'Message',
        value: reservation.message
      },
      {
        label: 'isRoundTrip',
        value: reservation.isRoundTrip
      },
      {
        label: 'baggage Count',
        value: reservation.baggageCount
      }
    ]
  }
}

const Row = ({ reservation, onStatusChange }) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(reservation.reservation.status)
  const [openDialog, setopenDialog] = useState(false)

  const [action, setAction] = useState(null)

  const handleConfirmationDialogOpen = action => {
    setAction(action)
    setopenDialog(true)
  }

  const handleConfirmationAction = () => {
    if (action === 'accepte') {
      onStatusChange(reservation.reservation._id, 'accepte')
    } else if (action === 'refuse') {
      onStatusChange(reservation.reservation._id, 'refuse')
    }
    setopenDialog(false)
  }

  return (
    <Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        {initialColumns.map(column => (
          <TableCell key={column.id} component='th' scope='row'>
            {column.format
              ? column.format(reservation.reservation[column.id])
              : column.id === 'date'
              ? new Date(reservation.reservation[column.id]).toLocaleDateString()
              : column.id === 'isRoundTrip'
              ? reservation[column.id]
                ? 'Aller-Retour'
                : 'Aller Simple'
              : reservation.reservation[column.id]}
          </TableCell>
        ))}
        <TableCell>
          <div>
            {reservation.reservation.status === 'en attente' ? (
              <>
                <Tooltip title='Accept Reservation' arrow>
                  <IconButton color='success' onClick={() => handleConfirmationDialogOpen('accepte')}>
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Reject Reservation' arrow>
                  <IconButton color='error' onClick={() => handleConfirmationDialogOpen('refuse')}>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <span>{/* {status} */}</span>
            )}
            <Dialog
              open={openDialog}
              onClose={() => setopenDialog(false)}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>Confirmation</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to {action === 'accepte' ? 'accepter' : 'refuser'} this reservation ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setopenDialog(false)} color='primary'>
                  Cancel
                </Button>
                <Button onClick={() => handleConfirmationAction(action)} color='error'>
                  {action === 'accepte' ? 'Accepter' : 'Refuser'}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 3 }}>
              <Typography variant='h6' gutterBottom component='div'>
                More informations
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    {reservation.history.map(column => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {additionalColumns.map(column => (
                    <TableCell key={column.id} component='th' scope='row'>
                      {column.id === 'isRoundTrip'
                        ? reservation.reservation[column.id]
                          ? 'Aller-Retour'
                          : 'Aller Simple'
                        : reservation.reservation[column.id]}
                    </TableCell>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = () => {
  const [reservations, setReservations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [openDialog, setopenDialog] = useState(false)
  const [filter, setFilter] = useState('toutes')
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleFilterChange = (event, newFilterValue) => {
    setFilter(newFilterValue)
    setCurrentPage(1)
  }

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const route =
        newStatus === 'accepte'
          ? `${API_BASE_URL}/api/reservation/reservations/${reservationId}/accept`
          : `${API_BASE_URL}/api/reservation/reservations/${reservationId}/reject`

      const response = await fetch(route, {
        method: 'PUT'
      })
      if (!response.ok) {
        throw new Error('Échec de la mise à jour du statut')
      }

      const updatedReservations = reservations.map(r =>
        r.reservation._id === reservationId ? { ...r, reservation: { ...r.reservation, status: newStatus } } : r
      )
      setReservations(updatedReservations)
      setopenDialog(false)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut :', error)
    }
  }

  // useEffect(() => {
  //   async function fetchReservations() {
  //     try {
  //       const response = await getAllReservation(currentPage, limit);
  //       setReservations(response.reservations.map(createData));
  //       setTotalPages(response.totalPages);

  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des réservations', error);
  //     }
  //   }

  //   fetchReservations();
  // }, [currentPage, limit,filter]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setCurrentPage(1)
  }

  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'toutes') {
      return true
    } else {
      return reservation.reservation.status === filter
    }
  })

  return (
    <TableContainer Container component={Paper}>
      <Toolbar>
        <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
          <Tooltip title='Show All Reservations' arrow>
            <ToggleButton value='toutes'>All</ToggleButton>
          </Tooltip>
          <Tooltip title='Show Accepted Reservations' arrow>
            <ToggleButton value='accepte'>Accepted</ToggleButton>
          </Tooltip>
          <Tooltip title='Show Pending Reservations' arrow>
            <ToggleButton value='en attente'>Pending</ToggleButton>
          </Tooltip>
          <Tooltip title='Show Rejected Reservations' arrow>
            <ToggleButton value='refuse'>Rejected</ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Toolbar>

      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            {initialColumns.map(column => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredReservations.map((reservation, index) => (
            <Row
              key={index}
              reservation={reservation}
              setopenDialog={setopenDialog}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={totalPages * limit}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TableCollapsible
