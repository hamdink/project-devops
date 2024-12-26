import { useState, useEffect } from 'react'
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
  Pagination // Import Pagination
} from '@mui/material'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import FAQModal from 'src/views/modals/faqModal'
import { deleteFAQ, getFAQs } from '../api/appConfig'

const FAQManager = () => {
  const [editingIndex, setEditingIndex] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState('')

  const [formData, setFormData] = useState({
    faqs: []
  })
  const [currentFAQ, setCurrentFAQ] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const faqsPerPage = 5 // Number of FAQs per page

  const openModalToAdd = () => {
    setCurrentFAQ(null)
    setModalOpen(true)
  }

  const openModalToEdit = index => {
    setCurrentFAQ(formData.faqs[index])
    setEditingIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentFAQ(null)
    setEditingIndex(null)
  }

  async function fetchData() {
    const response = await getFAQs()
    if (response) {
      setFormData({ faqs: [...response] })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddOrUpdateFAQ = data => {
    if (editingIndex !== null) {
      const updatedFAQs = [...formData.faqs]
      updatedFAQs[editingIndex] = data
      setFormData({ ...formData, faqs: updatedFAQs })
    } else {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, data]
      }))
    }
    closeModal()
  }

  const handleDeleteFAQ = id => {
    setSectionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    await deleteFAQ(sectionToDelete)
    await fetchData()
    setSectionToDelete('')
    setDeleteDialogOpen(false)
  }

  // Calculate the current FAQs to display based on pagination
  const indexOfLastFAQ = currentPage * faqsPerPage
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage
  const currentFAQs = formData.faqs.slice(indexOfFirstFAQ, indexOfLastFAQ)

  // Pagination handlers
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>FAQ Section</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='FAQ Management' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Button variant='contained' color='primary' onClick={openModalToAdd}>
                Add New FAQ
              </Button>

              <Table style={{ marginTop: 20 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentFAQs.map((faq, index) => (
                    <TableRow key={index}>
                      <TableCell>{faq.question}</TableCell>
                      <TableCell
                        style={{
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {faq.answer}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => openModalToEdit(index)} size='small' color='primary'>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteFAQ(faq._id)} size='small' color='secondary'>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                  count={Math.ceil(formData.faqs.length / faqsPerPage)} // Total pages
                  page={currentPage} // Current page
                  onChange={handlePageChange} // Page change handler
                  color='primary'
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <FAQModal
          open={modalOpen}
          onClose={closeModal}
          onSubmit={handleAddOrUpdateFAQ}
          data={currentFAQ}
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
      </div>
    </RequireAdmin>
  )
}

export default FAQManager
