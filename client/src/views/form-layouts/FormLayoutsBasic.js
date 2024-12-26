import { useState } from 'react';
import { addProduct } from 'src/pages/api/appConfig';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MultilingualProductForm = () => {
  const [productData, setProductData] = useState({
    name_fr: '',
    name_en: '',
    name_fl: '',
    description_fr: '',
    description_en: '',
    description_fl: '',
    image: null,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !productData.name_fr ||
        !productData.name_en ||
        !productData.name_fl ||
        !productData.description_fr ||
        !productData.description_en ||
        !productData.description_fl ||
        !productData.image
      ) {
        console.error('Veuillez remplir tous les champs obligatoires.');

        return;
      }
      await addProduct(productData);
      window.location.href = '/offres';
      console.log('Produit ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  };

  return (
    <Card>
      <CardHeader title="Service Creation Interface" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="French"
                placeholder="Product Name (French)"
                name="name_fr"
                value={productData.name_fr}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="English"
                placeholder="Product Name (English)"
                name="name_en"
                value={productData.name_en}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Flamend"
                placeholder="Product Name (Flamend)"
                name="name_fl"
                value={productData.name_fl}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="French"
                placeholder="Product Description (French)"
                name="description_fr"
                value={productData.description_fr}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="English"
                placeholder="Product Description (English)"
                name="description_en"
                value={productData.description_en}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Flamend"
                placeholder="Product Description (Flamend)"
                name="description_fl"
                value={productData.description_fl}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large">
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default MultilingualProductForm;
