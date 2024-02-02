import Navbar from '/src/Pages/Base/Navbar.jsx'
import Content from '/src/Pages/Base/Content.jsx'
import Home from '/src/Pages/Home/Home.jsx'
import Profile from './Pages/Profile/Profile'
import NewBlog from './Pages/NewBlog/NewBlog'
import { Navigate, Route, Routes } from "react-router-dom"
import BlogDetail from './Pages/BlogDetail/BlogDetail'
import Login from './Pages/Login/Login'
import { useAuth } from './utils/context/AuthContext.context'
import NotFound from './Pages/NotFound/NotFound'
//import { PrivateRoute } from './utils/CustomRoute/CustomRoute.route'


function App() {
  const { account } = useAuth();
  return (
    <div className='__App__'>
      <Navbar />
      <Content>
        <Routes>
          <Route path="/blog" element={<Home/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/blog/new" element={ account ? <NewBlog/> : <Navigate to={'/login'} />} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
          <Route path="/login" element={ account ? <Navigate to={'/blog'}/> : <Login />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Routes>
      </Content>
    </div>
  )
}

export default App
