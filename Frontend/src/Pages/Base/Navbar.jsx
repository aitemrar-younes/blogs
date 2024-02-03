import React from 'react'
import '/src/assets/Styles/Navbar.scss'
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/context/AuthContext.context';
const Navbar = () => {
  const { logout, account } = useAuth();
  return (
    <div className='__Navbar__ container'>
        <h2 className="brand">
            Blogy
        </h2>
        <ul className="Links">
            <Link to='/blog' className="link_item">Home</Link>
            <Link to='/blog/new' className="link_item">New blog</Link>
            { account == null ? 
              ( <Link to='/login' className="link_item">Login</Link> ) 
              :( <button className="link_item" onClick={()=>logout()}>Logout</button> )
            }
            { account ? 
              <Link to={`/profile/${account.id}/`} className="link_item" >{ account.username }</Link>
              : '' 
            }
            { account ? 
              <Link to={`/profile/${account.id}/`} className="link_item" ><img className='navbar_profile_img' src={ account.profile_picture } alt="" /></Link>
              : '' 
            }
        </ul>
    </div>
  )
}

export default Navbar