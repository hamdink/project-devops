/* eslint-disable padding-line-between-statements */
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Select,
  Input,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { addProject, updateProject } from 'src/pages/api/appConfig'

const FeaturedProjectsDataModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [currentSection, setCurrentSection] = useState({
    title: '',
    image: null,
    imageUrl: '',
    link:''
  })

  useEffect(() => {
    if (data) {
        console.log('Editing mode, data:', data); // Debugging line
      setCurrentSection({ ...data,imageUrl: data.image })
    } else {
      setCurrentSection({
        title: '',
        image: null,
        imageUrl: '',
        link:''
      })
    }
  }, [data])

  const handleImageChange = e => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setCurrentSection(prev => ({ ...prev, image: imageFile, imageUrl }))
    }
  }

  const handleFormChange = e => {
    const { name, value } = e.target
    setCurrentSection(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const {title, image, link, width, height } = currentSection
    if (!data) {
      await addProject({
        title,
        image,
        link
      })
      await fetchData()
      onClose()
    } else {
      await updateProject(data._id, {
        title,
        image,
        link
      })
      await fetchData()
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='md'>
      <DialogTitle>{data ? 'Update Section' : 'Add Section'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ marginBottom: 10, marginTop: 10 }}
            fullWidth
            label='Title'
            name='title'
            value={currentSection.title}
            onChange={handleFormChange}
          />
          <TextField
            style={{ marginBottom: 10, marginTop: 10 }}
           fullWidth
            label='Link'
             name='link'
            value={currentSection.link}
            onChange={handleFormChange}
          />
          <Box marginBottom={2}>
            <Input type='file' name='image' accept='image/*' onChange={handleImageChange} />
            {currentSection.imageUrl && (
              <img src={currentSection.imageUrl} alt='Preview' style={{ width: '50px', height: '50px', marginTop: '10px' }} />
              
            )}
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

export default FeaturedProjectsDataModal