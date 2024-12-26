import { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  Card,
  Button,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogActions,
  Pagination
} from '@mui/material'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import ReservationModal from 'src/views/modals/ReservationModal'
import { deleteReservation, getAllReservations } from '../api/appConfig'
import { formatDate, formatDateTime } from 'src/@core/utils/hex-to-rgba'

const LeadershipTeam = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [sectionToDelete, setSectionToDelete] = useState('')
  const [page, setPage] = useState(1) // Current page state
  const [limit, setLimit] = useState(10) // Items per page state
  const [totalPages, setTotalPages] = useState(1) // Total pages for pagination
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    teamMembers: []
  })

  async function fetchData(page, limit, accessToken) {
    const response = await getAllReservations(page, limit, accessToken)
    if (response) {
      console.log(response)
      setFormData({ teamMembers: response })
      setTotalPages(response.totalPages) // Set the total pages based on the response
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    fetchData(page, limit, token)
  }, [page, limit]) // Fetch data when `page` or `limit` changes

  const handleDeleteMember = id => {
    setSectionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken')
    await deleteReservation(sectionToDelete)
    await fetchData(page, limit, token)
    setSectionToDelete('')
    setDeleteDialogOpen(false)
  }

  const handleEditMember = reservation => {
    setSelectedReservation(reservation)
    setModalOpen(true)
  }

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>Reservations Section</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='All Reservations' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Participant Name</TableCell>
                    <TableCell>Person Number</TableCell>
                    <TableCell>Date</TableCell>
               
            
                    
                   <TableCell>Hotel</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.teamMembers && formData.teamMembers.length > 0 ? (
                    formData.teamMembers.map((reservation, index) => (
                      <TableRow key={index}>
                        <TableCell>{reservation.NameOfParticipants[0]}</TableCell>
                        <TableCell>{reservation.nbPersonne}</TableCell>
                        <TableCell>{formatDateTime(reservation.date,reservation.heure) }</TableCell>
                        
                        <TableCell>{reservation.hotel}</TableCell>
                        <TableCell>
                          {reservation.activity.map((activity, index) => (
                            <span key={index} style={{ display: 'block' }}>
                              {activity}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell>{reservation.status}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEditMember(reservation)}>Edit</Button>
                          <Button onClick={() => handleDeleteMember(reservation._id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align='center'>
                        No reservations found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Control */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                  count={totalPages} // Total number of pages
                  page={page} // Current page
                  onChange={(event, value) => setPage(value)} // Handle page change
                  color='primary'
                />
              </div>
            </CardContent>
          </Card>

          {/* Reservation Modal */}
          <ReservationModal
           
            page={page}
            limit={limit}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            data={selectedReservation}
            fetchData={fetchData}
          />

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} color='secondary'>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    </RequireAdmin>
  )
}

export default LeadershipTeam
