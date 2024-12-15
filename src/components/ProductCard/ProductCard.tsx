import { Card, CardActionArea, CardMedia, CardContent, Typography, Tooltip } from '@mui/material';
import { ProductCardProps } from '../../types/types';


export default function ProductCard({ onClick, product }: ProductCardProps) {

  return (
    <div onClick={() => onClick(product)}>
      <Tooltip title={product.description}>
        <Card sx={{
          width: 300,
          height: 400,
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
          }
        }}
        >
          <CardActionArea>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
            </CardContent>

            {product && product.image ? (
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: '150px',
                  height: '100px',
                  marginBottom: '16px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '150px',
                  height: '100px',
                  backgroundColor: '#f0f0f0',
                  color: '#888',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '16px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                Изображение отсутствует
              </div>
            )}

            <CardContent>
              <Typography variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.description}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Количество: {product.quantity}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Единица измерения: {product.unit}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Категория: {product.category}
              </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
      </Tooltip>
    </div>
  )
}