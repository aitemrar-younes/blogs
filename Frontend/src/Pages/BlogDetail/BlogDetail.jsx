import React from 'react'
import '/src/assets/Styles/BlogDetail.scss'
import { RetrieveBlog } from '../../utils/api/blog.api';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/context/AuthContext.context';
import { FaHeart } from 'react-icons/fa';

function BlogDetail() {
    const blog_id = useParams().id;
    const { isAuthenticated } = useAuth();
    const BlogDetailQuery = useQuery({
        queryKey: ["blog", blog_id],
        queryFn: ()=>RetrieveBlog(blog_id),
        retry:false
    });
  

    if (BlogDetailQuery.isLoading)
    return (
        <p>Is loading ...</p>
    )
    if ( !BlogDetailQuery.data )
    return (
        <p>No data available</p>
    )
    
    const { data:blog } = BlogDetailQuery
        
    return (
        <div className='__BlogDetail__'>
            <div className="blog_details">
                <div className="left_side">
                    <h1 className='blog_title'> { blog.title } </h1>
                    <span>Posted on { blog.creation_date }</span>
                    <span> { blog.likes_count } <FaHeart /> </span>
                </div>
                <div className="author_profile">
                    <span> Written by <Link className='author_cred' to={`/profile/${blog.author.id}/`}> @{ blog.author.first_name + ' '+blog.author.last_name }</Link> </span>
                    <Link to={`/profile/${blog.author.id}/`}><img className='author_profile_img' src={ blog.author.profile_picture } alt="profile" /></Link>
                </div>
            </div>
            <img className='thumbnail' src={blog.thumbnail} alt="" />
            <p dangerouslySetInnerHTML={{ __html: blog.content }}>
            </p>
        </div>
    )
}

export default BlogDetail