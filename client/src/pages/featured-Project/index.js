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
  DialogActions
} from '@mui/material'
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin'
import FeaturedProjectsDataModal from 'src/views/modals/ourFeaturedProjects'
import { deleteProject, getProject } from '../api/appConfig'

const CardBasic = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState('')

  const [formData, setFormData] = useState({
    projects: []
  })
  async function fetchData() {
    const response = await getProject()
    if (response) {
      setFormData({ projects: [...response] })
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = projectData => {
    if (selectedProject) {
      const updatedProjects = [...formData.projects]
      const indexToUpdate = formData.projects.findIndex(p => p === selectedProject)
      updatedProjects[indexToUpdate] = projectData
      setFormData({ projects: updatedProjects })
    } else {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, projectData]
      }))
    }
    setModalOpen(false)
    setSelectedProject(null)
  }

  const handleDeleteProject = id => {
    setSectionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    await deleteProject(sectionToDelete)
    await fetchData()
    setSectionToDelete('')
    setDeleteDialogOpen(false)
  }

  const handleEditProject = project => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <RequireAdmin>
      <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ paddingBottom: 10 }}>
            <Typography variant='h5'>Our Featured Projects Section</Typography>
          </Grid>
          <Card style={{ width: '100%' }}>
            <CardHeader title='Our Featured Projects Interface' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  setSelectedProject(null)
                  setModalOpen(true)
                }}
              >
                Add New Project
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Description</TableCell>
                    <TableCell>Language</TableCell> */}
                    <TableCell>Title</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.projects.map((project, index) => (
                    <TableRow key={index}>
                     {/*  <TableCell
                        style={{
                          maxWidth: '150px',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {partner.description}
                      </TableCell>
                      <TableCell>{partner.language === 'fr' ? 'French' : 'English'}</TableCell> */}
                      <TableCell>{project.title}</TableCell>
                      <TableCell>
                        <img src={project.image} alt='Partner' style={{ width: '50px', height: '50px' }} />
                      </TableCell>
                      <TableCell>{project.link}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditProject(project)}>Edit</Button>
                        <Button onClick={() => handleDeleteProject(project._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <FeaturedProjectsDataModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit}
            data={selectedProject}
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
