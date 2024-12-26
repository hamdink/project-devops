import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from '@mui/material'
import { addFAQ, updateFAQ } from 'src/pages/api/appConfig'

const FAQModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const initialFAQ = data || { question: '', answer: ''} // Include language in the initial state
  const [faq, setFAQ] = useState(initialFAQ)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFAQ(prev => ({ ...prev, [name]: value }))
  }



  const handleSave = async () => {
    if (!data) {
      await addFAQ({
        question: faq.question,
        answer: faq.answer,
        
      })
      await fetchData()
      onClose()
    } else {
      await updateFAQ(data._id, {
        question: faq.question,
        answer: faq.answer,
        language: faq.language
      })
      await fetchData()
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{data ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin='dense'
          label='Question'
          name='question'
          value={faq.question}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin='dense'
          label='Answer'
          name='answer'
          multiline
          rows={4}
          value={faq.answer}
          onChange={handleInputChange}
          required
        />
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FAQModal
