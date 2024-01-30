import React from 'react'
import '/src/assets/Styles/BlogDetail.scss'
import { RetrieveBlog } from '../../utils/api/blog.api';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function BlogDetail() {
  const blog_id = useParams().id;
  const BlogDetailQuery = useQuery({
		queryKey: ["blog", blog_id],
		queryFn: ()=>RetrieveBlog(blog_id),
	});
  

  if (BlogDetailQuery.isLoading)
    return (
        <p>Is loading ...</p>
    )
  if ( !BlogDetailQuery.data )
    return (
        <p>No data available</p>
    )
  return (
    <div className='__BlogDetail__'>
        <img src={BlogDetailQuery?.data.thumbnail} alt="" />
        <h1>
          { BlogDetailQuery?.data.title }
        </h1>
        <p dangerouslySetInnerHTML={{ __html: BlogDetailQuery?.data.content }}>
        </p>
    </div>
  )
}

export default BlogDetail