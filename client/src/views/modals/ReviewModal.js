import { useState, useEffect } from 'react'
import {
  Dialog,

  DialogContent,
  DialogTitle,

  Button,

} from '@mui/material'
import {  approveReview } from 'src/pages/api/appConfig'

const ReviewModal = ({ open, onClose, onSubmit, data,page,limit,fetchData }) => {
  console.log(data)
  
  const updateStatus = async (status) => {
    const token = localStorage.getItem('accessToken')
    await approveReview(data._id)
    fetchData(page, limit, token)
    onClose()
  }


  return (
    <Dialog open={open} onClose={onClose} fullWidth={false} maxWidth='md'>
      <DialogTitle>Accept reservation</DialogTitle>
      <DialogContent>
        <Button onClick={onClose} >decline</Button>
        <Button onClick={updateStatus} >Accept</Button>

      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal
