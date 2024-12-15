import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ModalProps } from '../../types/types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'auto',
    maxHeight: '500px'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '600px',
    height: '400px',
    maxHeight: '500px',
  },
}));


export default function Modal({ product, onClose, open }: ModalProps) {
  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {product ? product.name : ''}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        {product && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '150px',
              height: 'auto',
              marginBottom: '16px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              minWidth: '150px',
              minHeight: '150px',
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
              minWidth: '150px',
              minHeight: '150px',
            }}
          >
            Изображение отсутствует
          </div>
        )}

        <DialogContent dividers>
          <Typography gutterBottom>
            {product ? product.description : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Количество: {product ? product.quantity : ''}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Единица измерения: {product ? product.unit : ''}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Категория: {product ? product.category : ''}
          </Typography>
        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}