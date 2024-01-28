import React from 'react'
import '/src/assets/Styles/Navbar.scss'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='__Navbar__ container'>
        <h2 className="brand">
            Blogy
        </h2>
        <ul className="Links">
            <Link to='/' className="link_item">Home</Link>
            {/* <Link to='/contact' className="link_item">Contact</Link>
            <Link to='/about' className="link_item">About</Link> */}
            <Link to='/new-blog' className="link_item">New blog</Link>
            <Link to='/profile' className="link_item">My blogy</Link>
        </ul>
    </div>
  )
}

export default Navbar