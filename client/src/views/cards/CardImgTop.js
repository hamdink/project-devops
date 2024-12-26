import React, { useState } from 'react';

// ** MUI Imports

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import PushPinIcon from '@mui/icons-material/PushPin';
import { toggleFavorite } from 'src/pages/api/appConfig'

const DescriptionDiv = styled('div')({
  maxHeight: '200px',
  overflowY: 'scroll',
});

const CardTitle = styled(Typography)({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  '&:hover': {
    whiteSpace: 'initial',
  },
});

const CardImgTop = ({product}) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imageUrl = `${API_BASE_URL}/uploads/${product.image}`;
  console.log(product)
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);


  const handleDetailsClick = () => {
    window.location.href = `/product/${product._id}`;
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await toggleFavorite(product._id);
      console.log('Response from toggleFavorite:', response);
      console.log('Current isFavorite state:', isFavorite);

      setIsFavorite(response.product.isFavorite);

      console.log(response.product.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  return (
    <div>
<Card style={{   marginBottom: '20px' }}>

  <CardMedia
   sx={{
    height: '31rem',
    width: '100%  ',
    margin:'auto',
  }}
  component= "img"
  src={imageUrl}
  alt={product.name}
  />
  <CardContent>
  <CardTitle variant='h6' sx={{ marginBottom: 2 }}>
            {product.name}
            <Button  size='small' onClick={handleFavoriteClick}>
            {isFavorite ? (
              <>
                <PushPinIcon color='info' /><Typography variant='body2' >
                          Unpin
                        </Typography>
              </>
            ) : (
              <>
                <PushPinIcon color='info'/><Typography variant='body2' >
                          Pin
                        </Typography>
              </>
            )}
          </Button>
   </CardTitle>
    <DescriptionDiv>
    <Typography variant='body2' style={{   height: '90px' }}>
      {product.description}
    </Typography>
    </DescriptionDiv>

  </CardContent>
  <Link href={`/offres/${product._id}`} passHref>
  <Button variant='contained' size='large'>
    Details
  </Button>
</Link>
</Card>
    </div>
  )
}

export default CardImgTop
