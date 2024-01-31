import React from 'react'
import '/src/assets/Styles/Profile.scss'
import Blog from '../../Components/Blog/Blog'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { RetrieveUser } from '../../utils/api/user.api';
import { useQuery } from '@tanstack/react-query';
import { ListBlogByAccount } from '../../utils/api/blog.api';

const Profile = () => {
    const user_id = useParams().id;
    const UserDetailQuery = useQuery({
        queryKey: ["user", user_id],
        queryFn: ()=>RetrieveUser(user_id),
        retry:false
    });
    const UserBlogsQuery = useQuery({
        queryKey: ["blogs", user_id],
        queryFn: ()=>ListBlogByAccount(user_id),
        retry:false,
        enabled: !!UserDetailQuery.data
    });
    if (!UserDetailQuery.data)
    return (
        <h1>No Account</h1>
    )
    
    //console.log(UserBlogsQuery.data)
    const { data:account } = UserDetailQuery
    
    return (
        <div className='__Profile__'>
            <div className="Informations_container">
                <div className="Informations">
                    <img className="profile_image" src={ account.profile_picture } alt="" />
                    <div className="Informations_body">
                        <h3 className='name'>{ account.first_name+' '+account.last_name }</h3>
                        <p className="bio">
                            { account.bio }
                        </p>
                        <span className="post_number">{ UserBlogsQuery?.data && UserBlogsQuery.data?.length } Posts has been published</span>
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
                {
                    UserBlogsQuery.data && UserBlogsQuery.data.map((blog)=>(
                        <Blog data={blog} key={blog.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Profile