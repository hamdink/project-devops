import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Card,
  CardHeader,
  CardContent
} from '@mui/material'
import WhoWeAreDataModal from 'src/views/modals/whoWeAreModal'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import { deleteWhoWeAreEntry, getWhoWeAreEntries } from '../api/appConfig'

const CardBasic = () => {
  const [items, setItems] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  async function fetchData() {
    const response = await getWhoWeAreEntries('en')
    const responseFr = await getWhoWeAreEntries('fr')
    if (response) {
      if (response.length > 0 && responseFr.length > 0) {
        setItems([
          {
            image: response[0].image,
            items: response[0].contents,
            _id: response[0]._id,
            language: response[0].language
          },
          {
            image: responseFr[0].image,
            items: responseFr[0].contents,
            _id: responseFr[0]._id,
            language: responseFr[0].language
          }
        ])
      } else if (response.length > 0) {
        setItems([
          {
            image: response[0].image,
            items: response[0].contents,
            _id: response[0]._id,
            language: response[0].language
          }
        ])
      } else if (responseFr.length > 0) {
        setItems([
          {
            image: responseFr[0].image,
            items: responseFr[0].contents,
            _id: responseFr[0]._id,
            language: responseFr[0].language
          }
        ])
      } else {
        setItems([])
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleAddOrUpdate = data => {
    if (selectedItem) {
      const updatedItems = [...items]

      const index = items.findIndex(
        item => item.title === selectedItem.title && item.description === selectedItem.description
      )

      updatedItems[index] = data
      setItems(updatedItems)
    } else {
      setItems(prev => [...prev, data])
    }
    setModalOpen(false)
    setSelectedItem(null)
  }

  const handleDelete = async () => {
    await deleteWhoWeAreEntry(itemToDelete)
    await fetchData()
    setDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>Who We Are Section</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='What We Do Creation Interface' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Grid item xs={12}>
                <Button variant='contained' onClick={() => setModalOpen(true)}>
                  Add New Item
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Language</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) =>
                      item.items.map((subItem, subIndex) => (
                        <TableRow key={`${index}-${subIndex}`}>
                          <TableCell style={{ width: '100px', wordWrap: 'break-word' }}>{subItem.title}</TableCell>
                          <TableCell style={{ maxWidth: '150px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                            {subItem.description}
                          </TableCell>

                          {subIndex === 0 && (
                            <>
                              <TableCell>{item.language === 'fr' ? 'French' : 'English'}</TableCell>
                              <TableCell style={{ width: '80px' }} rowSpan={item.items.length}>
                                <img src={item.image} alt={subItem.title} width={50} />
                              </TableCell>
                              <TableCell style={{ width: '100px' }} rowSpan={item.items.length}>
                                <Button
                                  onClick={() => {
                                    setSelectedItem(item)
                                    setModalOpen(true)
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => {
                                    setItemToDelete(item._id)
                                    setDeleteDialogOpen(true)
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <WhoWeAreDataModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddOrUpdate}
          data={selectedItem}
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

export default CardBasic
