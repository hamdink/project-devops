import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Input,
  IconButton,
  Box,
  Select,
  MenuItem
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { addWhoWeAreEntry, updateWhoWeAreEntry } from 'src/pages/api/appConfig'

const WhoWeAreDataModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [formData, setFormData] = useState({
    image: null,
    imageUrl: '',
    items: [],
    language: 'en' // Default language set to English ('en')
  })

  const [allItems, setAllItems] = useState([])

  const [currentItem, setCurrentItem] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({ ...data, imageUrl: data.image, language: data.language || 'en' })
      setAllItems(data.items || [])
    } else {
      setFormData({
        image: null,
        imageUrl: '',
        items: [],
        language: 'en'
      })
      setAllItems([])
    }
    setCurrentItem({ title: '', description: '' })
  }, [data])

  const handleFormChange = e => {
    const { name, value } = e.target
    setCurrentItem(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const imageFile = e.target.files[0]

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setFormData(prev => ({ ...prev, image: imageFile, imageUrl }))
    } else {
      setFormData(prev => ({ ...prev, imageUrl: prev.image }))
    }
  }

  const handleLanguageChange = event => {
    const { value } = event.target
    setFormData(prev => ({ ...prev, language: value }))
  }

  const addCurrentItemToArray = () => {
    setAllItems(prev => [...prev, currentItem])
    setCurrentItem({ title: '', description: '' })
  }

  const deleteItemFromArray = index => {
    if (allItems.length === 1 && index === 0) {
      return
    }
    const newItems = [...allItems]
    newItems.splice(index, 1)
    setAllItems(newItems)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const finalData = {
      ...formData,
      items: allItems
    }
    if (!data) {
      await addWhoWeAreEntry({
        image: finalData.image,
        contents: finalData.items,
        language: finalData.language
      })
      await fetchData()
      onClose()
    } else {
      await updateWhoWeAreEntry(data._id, {
        image: finalData.image,
        contents: finalData.items,
        language: finalData.language
      })
      await fetchData()
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='md'>
      <DialogTitle>{data ? 'Update Items' : 'Add Items'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <Input type='file' name='image' accept='image/*' onChange={handleImageChange} />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt='Preview' style={{ width: '50px', height: '50px', marginTop: '10px' }} />
            )}
          </Box>

          <Box marginBottom={2}>
            <Select
              labelId='language-selector-label'
              id='language-selector'
              value={formData.language}
              onChange={handleLanguageChange}
              fullWidth
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='fr'>French</MenuItem>
            </Select>
          </Box>

          {allItems.map((item, index) => (
            <Box key={index} marginBottom={2}>
              <TextField style={{ marginBottom: 10 }} fullWidth label={`Title ${index + 1}`} value={item.title} />
              <TextField
                style={{ marginBottom: 5 }}
                fullWidth
                multiline
                rows={4}
                label={`Description ${index + 1}`}
                value={item.description}
              />
              {allItems.length > 1 && (
                <IconButton onClick={() => deleteItemFromArray(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <Box marginBottom={2}>
            <TextField fullWidth label='Title' name='title' value={currentItem.title} onChange={handleFormChange} />
          </Box>
          <Box marginBottom={2}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label='Description'
              name='description'
              value={currentItem.description}
              onChange={handleFormChange}
            />
          </Box>

          <IconButton onClick={addCurrentItemToArray}>
            <AddCircleIcon />
          </IconButton>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='submit'>{data ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WhoWeAreDataModal
