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
import { addPartner, updatePartner } from 'src/pages/api/appConfig'

const PartnerDataModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [formData, setFormData] = useState({
  
    link: '',
    image: null,
    location:''

    
  })

  useEffect(() => {
    if (data) {
      /* setFormData({ ...data, imageUrl: data.image, language: data.language || 'en' }) */
      setFormData({ ...data, image: data.image})
    } else {
      setFormData({
       
        link: '',
        image: null,
        imageUrl: ''
      
      })
    }
  }, [data])

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }



  const handleImageBlackChange = e => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setFormData(prev => ({ ...prev, image: imageFile, imageUrl: imageUrl }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { image,link,location } = formData
    if (!data) {
      await addPartner({
       
       image,
        link,
        location,
      })
      await fetchData()
      onClose()
    } else {
      await updatePartner(data._id, {
        image,  
        link,
        location,
      })
      await fetchData()
      onClose()
    }
  }

  const handelLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='sm'>
      <DialogTitle>{data ? 'Update Partner' : 'Add Partner'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
       
            <Box marginTop={3} marginBottom={2}>
            <TextField
              fullWidth
              label='Link'
              name='link'
              value={formData.link}
              onChange={handleFormChange}
            />
          </Box>
          <Select
          labelId='language-selector-label'
          id='language-selector'
          value={formData.location}
          onChange={handelLocationChange}
          fullWidth
          margin='dense'
          required
        >
          <MenuItem value='sousse'>Sousse</MenuItem>
          <MenuItem value='monastir'>Monastir</MenuItem>
        </Select>

          <Box marginBottom={2}>
            <Input type='file' name='image' accept='image/*'  placeholder='Black Image' onChange={handleImageBlackChange} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt='Preview' style={{ width: '50px', height: '50px', marginTop: '10px' }} />
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

export default PartnerDataModal
