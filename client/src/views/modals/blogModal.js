/* eslint-disable padding-line-between-statements */
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
  MenuItem,
  Typography
} from '@mui/material';
import { addBlog, updateBlog } from 'src/pages/api/appConfig';

// Charger ReactQuill de manière dynamique pour éviter les erreurs côté serveur
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // import styles

const BlogPostModal = ({ open, onClose, onSubmit, data, fetchData }) => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    image2: null,
    content: '',
    imageUrl: '',
    image2Url: '',
    date: '',
    person: '',
    language: 'en'
  });
  const [value, setValue] = useState('');
  const [quillModules, setQuillModules] = useState({});
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Quill } = require('react-quill');
      const customColors = ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#004E90', '#ffffff', '#788094'];
      const Size = Quill.import('attributors/style/size');
      Size.whitelist = ['0.75px', '1rem', '1.5rem', '1.875rem', '2.25rem', '3rem']; // Ajoutez ici les tailles de police souhaitées
      Quill.register(Size, true);

      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': Size.whitelist }],
        [{ 'color': customColors }, { 'background': customColors }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ];

      setQuillModules({ toolbar: toolbarOptions });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({ ...data, date: data.createdAt, imageUrl: data.image, image2Url: data.image2, language: data.language || 'en' });
    } else {
      setFormData({
        title: '',
        image: null,
        imageUrl: '',
        image2: null,
        image2Url: '',
        content: '',
        date: '',
        person: '',
        language: 'en'
      });
    }
  }, [data]);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = event => {
    setFormData(prev => ({ ...prev, language: event.target.value }));
  };

  const handleImageChange = e => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setFormData(prev => ({ ...prev, image: imageFile, imageUrl }));
    } else {
      setFormData(prev => ({ ...prev, imageUrl: prev.image }));
    }
  };
  const handleImage2Change = e => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const image2Url = URL.createObjectURL(imageFile);
      setFormData(prev => ({ ...prev, image2: imageFile, image2Url }));
    } else {
      setFormData(prev => ({ ...prev, image2Url: prev.image2 }));
    }
  };

  const handleContentChange = value => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { image, image2, title, content, date, person, language } = formData;
    console.log({
      image,
      image2,
      title,
      content,
      person,
      createdAt: date,
      language
    });
    if (!data) {
      await addBlog({
        image,
        image2,
        title,
        content,
        person,
        createdAt: date,
        language
      });
      await fetchData();
      onClose();
    } else {
      await updateBlog(data._id, {
        image,
        image2,
        title,
        content,
        person,
        createdAt: date,
        language
      });
      await fetchData();
      onClose();
    }
  };

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={maximized ? 'xl' : 'md'}>
      <DialogTitle>
        {data ? 'Update Blog Post' : 'Add Blog Post'}
        <Button onClick={toggleMaximize} style={{ float: 'right' }}>
          {maximized ? 'Restore' : 'Maximize'}
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box marginTop={3} marginBottom={2}>
            <TextField
              fullWidth
              label='Title'
              name='title'
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </Box>
          <Box marginTop={3} marginBottom={2}>
            <TextField
              fullWidth
              label='Content'
              name='content'
              value={formData.content}
              onChange={handleFormChange}
              required
            />
          </Box>
     
          <Box marginBottom={3}>
            <TextField
              fullWidth
              multiline
              rows={1}
              label='Person'
              name='person'
              value={formData.person}
              onChange={handleFormChange}
              required
            />
          </Box>

       
       
          <Box marginBottom={3}>
            <Typography variant="body1" component="p" marginBottom={1}>
              Upload a card image:
            </Typography>
            <Input type='file' name='image' accept='image/*' onChange={handleImageChange} required />
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
  );
};

export default BlogPostModal;
