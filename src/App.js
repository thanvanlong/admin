import { Box, Card, Container } from '@mui/material';
import { Route, Routes, useParams } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Nav from './components/Nav';
import NavChild from './components/NavChild';
import ManagePage from './container/ManagePage';
import HomePage from './container/HomePage';
import EditPage from './container/EditPage';
function App() {
  return (
    <div className="App">
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'space-around' }}>
        <Nav />
        <Box sx={{ width: '80%' }}>
          <Header />
          <NavChild />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/manage'>
              <Route path=':id' element={<ManagePage />} />
            </Route>
            <Route path='/edit'>
              <Route path=':user'>
                <Route path=':id' element={<EditPage />} />
              </Route>
            </Route>
          </Routes>
        </Box>
      </Box>

    </div>
  );
}

export default App;
