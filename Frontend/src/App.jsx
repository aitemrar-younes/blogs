import Navbar from '/src/Pages/Base/Navbar.jsx'
import Content from '/src/Pages/Base/Content.jsx'
import Home from '/src/Pages/Home/Home.jsx'
import Profile from './Pages/Profile/Profile'
import NewBlog from './Pages/NewBlog/NewBlog'
import { Route, Routes } from "react-router-dom"
import BlogDetail from './Pages/BlogDetail/BlogDetail'

function App() {
  return (
    <div className='__App__'>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/blog" element={<Home/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/blog/new" element={<NewBlog/>} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
        </Routes>
      </Content>
    </div>
  )
}

export default App
