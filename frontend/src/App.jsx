import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dash from './pages/Dash'
import PrivateRoute from './components/PrivateRoute'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/dash" 
          element={<PrivateRoute> 
                      <Dash/> 
                  </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
