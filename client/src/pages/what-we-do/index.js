import React, { useState, useEffect } from 'react'
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
  Pagination,
} from '@mui/material'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import WhatWeDoDataModal from 'src/views/modals/whatWeDoModal'
import { deleteActivity, getActivities } from '../api/appConfig'

const CardBasic = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [activityToDelete, setActivityToDelete] = useState('')
  // eslint-disable-next-line padding-line-between-statements
  const [formData, setFormData] = useState({
    activities: []
  })

  // Pagination state
  const [page, setPage] = useState(1) // Page starts from 1 for MUI Pagination
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const fetchData = async () => {
    try {
      const response = await getActivities()
      if (response) {
        setFormData({ activities: [...response] })
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = activityData => {
    if (selectedActivity) {
      const updatedActivities = [...formData.activities]
      const indexToUpdate = formData.activities.findIndex(m => m === selectedActivity)
      updatedActivities[indexToUpdate] = activityData
      setFormData({ activities: updatedActivities })
    } else {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, activityData]
      }))
    }
    setModalOpen(false)
    setSelectedActivity(null)
  }

  const handleDeleteActivity = id => {
    setActivityToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    try {
      await deleteActivity(activityToDelete)
      await fetchData()
      setActivityToDelete('')
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting activity:', error)
    }
  }

  const handleEditActivity = activity => {
    setSelectedActivity(activity)
    setModalOpen(true)
  }

  // Pagination handlers
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  // Calculate the displayed activities based on pagination
  const paginatedActivities = formData.activities.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>Our Services</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='Our Services Interface' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  setSelectedActivity(null)
                  setModalOpen(true)
                }}
                sx={{ mr: 2 }}
              >
                Add New Service
              </Button>

              {/* Horizontal scrolling wrapper */}
              <div style={{ overflowX: 'auto' }}>
                <Table style={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Language</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedActivities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell>
                          <img src={activity.image} alt='Activity' style={{ width: '50px', height: '50px' }} />
                        </TableCell>
                        <TableCell>{activity.language === 'fr' ? 'French' : 'English'}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEditActivity(activity)}>Edit</Button>
                          <Button onClick={() => handleDeleteActivity(activity._id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Pagination
                  count={Math.ceil(formData.activities.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color='primary'
                />
              </div>
            </CardContent>
          </Card>

          <WhatWeDoDataModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false)
              setSelectedActivity(null)
            }}
            onSubmit={handleSubmit}
            data={selectedActivity}
            fetchData={fetchData}
          />

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

export default CardBasic
