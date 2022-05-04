import { Box, Card, Container } from '@mui/material';
import './App.css'
import Header from './components/Header';
import Nav from './components/Nav';
import NavChild from './components/NavChild';
import EngineerPage from './container/EngineerPage';
import HomePage from './container/HomePage';
function App() {
  return (
    <div className="App">
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'space-around' }}>
        <Nav />
        <Box sx={{width: '80%'}}>
          <Header />
          <NavChild />
          <HomePage />
          {/* <EngineerPage /> */}
        </Box>
      </Box>

    </div>
  );
}

export default App;
