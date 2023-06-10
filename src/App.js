import { Box, Card, Container } from '@mui/material';
import { Route, Routes, useParams, useLocation } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Nav from './components/Nav';
import NavChild from './components/NavChild';
import ManagePage from './container/ManagePage';
import HomePage from './container/HomePage';
import EditPage from './container/EditPage';
import AddPage from './container/AddPage';
import AddPageV2 from './container/AddPageV2';
import SignUp from './container/SignupPage';
import SignIn from './container/LoginPage';
function App() {
  const user = localStorage.getItem("USER_ACC")
  const location = useLocation()
  console.log(location.pathname);
  return (
    <div className="App">
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'space-around' }}>
        {location.pathname != '/signup' && location.pathname != '/login' ? <Nav /> : <></>}
        <Box sx={{ width: '80%' }}>
        {location.pathname != '/signup' && location.pathname != '/login' ? <Header /> : <></>}
        {location.pathname != '/signup' && location.pathname != '/login' ? <NavChild /> : <></>}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/manage'>
              <Route path=':id' element={<ManagePage />} />
            </Route>
            <Route path='/add'>
              <Route path=':id' element={<AddPageV2 />} />
            </Route>
            <Route path='/edit'>
              <Route path=':book'>
                <Route path=':id' element={<AddPageV2 />} />
              </Route>
            </Route>
          </Routes>
        </Box>
      </Box>

    </div>
  );
}

export default App;
