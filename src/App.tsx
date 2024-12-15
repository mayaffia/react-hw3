import { Button, CssBaseline } from '@mui/material';
import MainContent from './components/MainContent/MainContent';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px', marginTop: '60px' }}>
        <Button variant="outlined" onClick={toggleTheme} sx={{
            color: isDarkMode ? '#f5f5f5' : '#161a1d',
            borderColor: isDarkMode ? '#f5f5f5' : '#161a1d',
            '&:hover': {
              borderColor: isDarkMode ? '#bbbbbb' : '#000',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(22, 26, 29, 0.08)',
            },
          }}
>
          Toggle Theme
        </Button>
      </div>
      <MainContent darkTheme={isDarkMode}/>
    </ThemeProvider>
  )
}

export default App