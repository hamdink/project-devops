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
  Pagination
} from '@mui/material'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import BlogPostModal from 'src/views/modals/blogModal'
import { deleteBlog, getBlogs } from '../api/appConfig'

const BlogManager = () => {
  const [editingIndex, setEditingIndex] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    blogPosts: []
  })
  const [currentPost, setCurrentPost] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5 // Number of posts per page

  const openModalToAdd = () => {
    setCurrentPost(null)
    setModalOpen(true)
  }

  async function fetchData() {
    const response = await getBlogs()
    if (response) {
      setFormData({ blogPosts: [...response] })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openModalToEdit = index => {
    setCurrentPost(formData.blogPosts[index])
    setEditingIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentPost(null)
    setEditingIndex(null)
  }

  const handleAddOrUpdatePost = data => {
    if (editingIndex !== null) {
      const updatedPosts = [...formData.blogPosts]
      updatedPosts[editingIndex] = data
      setFormData({ ...formData, blogPosts: updatedPosts })
    } else {
      setFormData(prev => ({
        ...prev,
        blogPosts: [...prev.blogPosts, data]
      }))
    }
    closeModal()
  }

  const handleDeletePost = id => {
    setSectionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    await deleteBlog(sectionToDelete)
    await fetchData()
    setSectionToDelete('')
    setDeleteDialogOpen(false)
  }

  // Calculate the current posts to display based on the pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = formData.blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Pagination handlers
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>Blog Section</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='Blog Post Management' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Button variant='contained' color='primary' onClick={openModalToAdd}>
                Add New Blog Post
              </Button>

              {/* Display the added blog posts in a table format */}
              <Table style={{ marginTop: 20 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPosts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.createdAt}</TableCell>
                      <TableCell
                        style={{
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {post.person}
                      </TableCell>
                      <TableCell>{post.language === 'fr' ? 'French' : 'English'}</TableCell>
                      <TableCell>
                        <img src={post.image} alt='Blog' style={{ width: '50px', height: '50px' }} />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => openModalToEdit(index)} size='small' color='primary'>
                          Edit
                        </Button>
                        <Button onClick={() => handleDeletePost(post._id)} size='small' color='secondary'>
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
                  count={Math.ceil(formData.blogPosts.length / postsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color='primary'
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <BlogPostModal
          open={modalOpen}
          onClose={closeModal}
          onSubmit={handleAddOrUpdatePost}
          data={currentPost}
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

export default BlogManager
