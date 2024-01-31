import React from 'react'
import '/src/assets/Styles/Navbar.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/context/AuthContext.context';
const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className='__Navbar__ container'>
        <h2 className="brand">
            Blogy
        </h2>
        <ul className="Links">
            <Link to='/blog' className="link_item">Home</Link>
            {/* <Link to='/contact' className="link_item">Contact</Link>
            <Link to='/about' className="link_item">About</Link> */}
            <Link to='/blog/new' className="link_item">New blog</Link>
            {/* { isAuthenticated ? ( <Link to='/blog/new' className="link_item">New blog</Link> ) : null } */}
            { isAuthenticated ? ( <Link to='/profile' className="link_item">My blogy</Link> ) : null }
            { !isAuthenticated ? ( <Link to='/login' className="link_item">Login</Link> ) : ( <Link to='/logout' className="link_item">Logout</Link> ) }
        </ul>
    </div>
  )
}

export default Navbar