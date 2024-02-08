import React from 'react'
import '/src/assets/Styles/BlogDetail.scss'
import { RetrieveBlog, RetrieveBlogIsLiked, ToggleBlogLike } from '../../utils/api/blog.api';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/context/AuthContext.context';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function BlogDetail() {
    const blog_id = useParams().id;
    const { isAuthenticated, account } = useAuth();
    const BlogDetailQuery = useQuery({
        queryKey: ["blog", blog_id],
        queryFn: ()=>RetrieveBlog(blog_id),
        retry:false
    });
    const BlogIsLikedQuery = useQuery({
        queryKey: ["blogLike", blog_id],
        queryFn: ()=>RetrieveBlogIsLiked(blog_id),
        retry:false,
        enabled:(BlogDetailQuery.data != null && isAuthenticated)
    });
    const BlogLikeToggleMutation = useMutation({
        mutationFn: ToggleBlogLike,
        onSuccess: (data) => {
            if (data.liked){
                BlogDetailQuery.data.likes_count++
                BlogIsLikedQuery.data.liked = true
            }
            else{
                BlogDetailQuery.data.likes_count--
                BlogIsLikedQuery.data.liked = false
            }

        },
        onError: (error) => {
        },
    })
  

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
      <div className="__BlogDetail__">
        <div className="blog_details">
          <div className="left_side">
            <h1 className="blog_title"> {blog.title} </h1>
            <span>Posted on {blog.creation_date}</span>
            <span>
                {blog.likes_count}
                { BlogIsLikedQuery?.data?.liked ? <FaHeart /> : <FaRegHeart /> }
            </span>
          </div>
          <div className="author_profile">
            <span>
              {" "}
              Written by{" "}
              <Link className="author_cred" to={`/profile/${blog.author.id}/`}>
                {" "}
                @{blog.author.first_name + " " + blog.author.last_name}
              </Link>{" "}
            </span>
            <Link to={`/profile/${blog.author.id}/`}>
              <img
                className="author_profile_img"
                src={blog.author.profile_picture}
                alt="profile"
              />
            </Link>
            {
                account?.id == blog?.author?.id ? (
                    <Link to={`/blog/${blog.id}/edit`}>
                        Edité
                    </Link>
                ):null
            }
          </div>
        </div>
        <img className="thumbnail" src={blog.thumbnail} alt="" />
        <p dangerouslySetInnerHTML={{ __html: blog.content }} />
        {isAuthenticated ? (
          <button onClick={() => BlogLikeToggleMutation.mutate(blog_id)}>
            <FaHeart />
          </button>
        ) : (
          <Link to="/login">
            <FaHeart /> If you like it, login and smash it
          </Link>
        )}
      </div>
    );
}

export default BlogDetail