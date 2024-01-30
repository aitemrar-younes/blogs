import React from 'react'
import '/src/assets/Styles/Profile.scss'
import Blog from '../../Components/Blog/Blog'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Profile = () => {
  return (
    <div className='__Profile__'>
        <div className="Informations_container">
            <div className="Informations">
                <img className="profile_image" src="/src/assets/Images/3840-2160-sample.webp" alt="" />
                <div className="Informations_body">
                    <h3 className='name'>Nom prenom</h3>
                    <p className="bio">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed tempore fugiat officiis repellendus nam vero similique?
                    </p>
                    <span className="post_number">17 Posts has been published</span>
                </div>
                <ul className="social_links">
                    <li className="social_link_item">
                        <FaFacebookSquare size={24} color='#1877F2' />
                    </li>
                    <li className="social_link_item">
                        <FaTwitterSquare size={24} color='#1DA1F2' />
                    </li>
                    <li className="social_link_item">
                        <FaYoutube size={24} color='#c4302b' />
                    </li>
                    <li className="social_link_item">
                        <FaLinkedin size={24} color='#0a66c2' />
                    </li>
                </ul>
            </div>
        </div>
        <div className="my_blog">
            
            {/* <Blog src={"/src/assets/Images/3840-2160-sample.webp"} /> */}
        </div>
    </div>
  )
}

export default Profile