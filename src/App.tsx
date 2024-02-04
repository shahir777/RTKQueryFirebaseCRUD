import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from './Pages/Home'
import AddEditBlog from './Pages/AddEditBlog'
import Detail from './Pages/Detail'
import Navbar from './Components/Navbar'

function App() {
  return (
    <BrowserRouter>
        <div className='app'>
          <Navbar/>
          <ToastContainer position='top-center'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<AddEditBlog />} />
          <Route path="/update/:id" element={<AddEditBlog />} />
          <Route path="/detail:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
