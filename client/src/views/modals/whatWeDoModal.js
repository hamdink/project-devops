import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Input,
  Select,
  MenuItem
} from '@mui/material'
import { addActivity, updateActivity } from 'src/pages/api/appConfig'

const WhatWeDoDataModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: [
            
        ],
        type: "",
        video: "",
  })
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (data) {
      setFormData({ ...data, imageUrl: data.image, language: data.language || 'en' })
      setCharCount(data.description ? data.description.length : 0) // Initialize character count
    } else {
      setFormData({
        name: "",
        description: "",
        image: [
            ""
        ],
        type: "",
        video: "",
      })
      setCharCount(0)
    }
  }, [data])

  const handleFormChange = e => {
    const { name, value } = e.target
    if (name === 'description') {
      setCharCount(value.length) // Update character count
    }
    setFormData(prev => ({
      ...prev,
      [name]: value,
      imageUrl: prev.image ? prev.imageUrl : '' // Preserve imageUrl if image exists
    }))
  }

  const handleLanguageChange = event => {
    const { value } = event.target
    setFormData(prev => ({ ...prev, language: value }))
  }

  const handleImageChange = e => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setFormData(prev => ({ ...prev, image: imageFile, imageUrl }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { image, description, name, language } = formData
    if (!data) {
      await addActivity({
        image,
        name,
        description,
        language
      })
      await fetchData()
      onClose()
    } else {
      await updateActivity(data._id, {
        image,
        name,
        description,
        language
      })
      await fetchData()
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='md'>
      <DialogTitle>{data ? 'Update Service' : 'Add Service'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label='Name'
              name='name'
              multiline
              rows={2}
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label='Description'
              name='description'
              multiline
              rows={2}
              value={formData.description}
              onChange={handleFormChange}
              inputProps={{ maxLength: 318 }} // Max length restriction
              required
            />
            <Box>
              {charCount >= 318 ? (
                <span style={{ color: 'red' }}>You have reached the maximum character limit.</span>
              ) : (
                <span>{charCount}/318 characters</span>
              )}
            </Box>
          </Box>
      

          <Box marginBottom={2}>
            <Input type='file' name='image' accept='image/*' onChange={handleImageChange} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt='Preview' style={{ width: '50px', height: '50px', marginTop: '10px' }} />
            )}
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              label='Video'
              name='video'
              multiline
              rows={2}
              value={formData.video}
              onChange={handleFormChange}
              required
              placeholder='Enter the video link'
            />
          </Box>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='submit'>{data ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WhatWeDoDataModal
