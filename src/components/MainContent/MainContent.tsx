import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import MenuItem from '@mui/material/MenuItem';

import { useState } from 'react';
import { Stack, TextField, FormControlLabel, Checkbox, Select, Button, InputAdornment } from '@mui/material';
import ProductList from '../ProductList/ProductList';
import { Close as CloseIcon } from '@mui/icons-material';
import NavBar from '../NavBar/NavBar';
import { MainContentProps } from '../../types/types';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainContent({darkTheme} : MainContentProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [productName, setProductName] = useState('');
  const [inStock, setInStock] = useState(false);
  const [category, setCategory] = useState('');


  const [submittedFilters, setSubmittedFilters] = useState({
    productName: '',
    inStock: false,
    category: '',
  });

  const handleFilterSubmit = () => {
    setSubmittedFilters({
      productName,
      inStock,
      category,
    });
    handleDrawerClose();
  };

  const handleResetFilters = () => {
    setProductName('');
    setInStock(false);
    setCategory('');
    setSubmittedFilters({
      productName: '',
      inStock: false,
      category: '',
    });
    handleDrawerClose();
  };

  const handleResetProductName = () => {
    setProductName('');
  };

  const handleResetCategory = () => {
    setCategory('');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <NavBar handleDrawerOpen={handleDrawerOpen} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Stack spacing={2} sx={{ width: 250, padding: 2 }}>
          <TextField
            label="Название товара"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: productName && (
                <InputAdornment position="end">
                  <IconButton onClick={handleResetProductName}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
            }
            label="Только в наличии"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            fullWidth
            renderValue={(selected) => {
              if (!selected) {
                return 'Выберите категорию';
              }
              return selected;
            }}
            endAdornment={category && (
              <InputAdornment position="end">
                <IconButton onClick={handleResetCategory}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )}
          >
            <MenuItem value="" disabled>
              Выберите категорию
            </MenuItem>
            <MenuItem value="Категория 1">Категория 1</MenuItem>
            <MenuItem value="Категория 2">Категория 2</MenuItem>
            <MenuItem value="Категория 3">Категория 3</MenuItem>
            <MenuItem value="Категория 4">Категория 4</MenuItem>
            <MenuItem value="Категория 5">Категория 5</MenuItem>
          </Select>

          <Button variant="contained" onClick={handleFilterSubmit} sx={{
            backgroundColor: darkTheme? '#f5f5f5' : '#161a1d',
          }}>
            Выполнить поиск
          </Button>

          <Button variant="outlined" onClick={handleResetFilters} sx={{
            color: darkTheme ? '#f5f5f5' : '#161a1d',
            borderColor: darkTheme ? '#f5f5f5' : '#161a1d',
            '&:hover': {
              borderColor: darkTheme ? '#bbbbbb' : '#000',
              backgroundColor: darkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(22, 26, 29, 0.08)',
            },
          }}
          >
            Сбросить фильтры
          </Button>
        </Stack>


      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <ProductList category={submittedFilters.category} name={submittedFilters.productName} inStock={submittedFilters.inStock} darkTheme={darkTheme} />
      </Main>
    </Box>
  );
}

