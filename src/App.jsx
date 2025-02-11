
import './App.css'
import Form from './Form'
import DetailCard from './DetailCard'
import Login from './Login'
import ProtectedRoutes from './ProtectedRoutes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserCard from './UserCard'

function App() {
 

  return (
   <Router>

    <>
    <Routes>
      <Route path='/' element={<Login />} />
      {/* protected routing */}
      <Route element={<ProtectedRoutes/>} >
        <Route path='form' element={<Form />} />
        <Route path='detail' element={<DetailCard />} />
        <Route path='users' element={<UserCard />} />
      </Route>
    </Routes>
    </>
   </Router>
  )
}

export default App
