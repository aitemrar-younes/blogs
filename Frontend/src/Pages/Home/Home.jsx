import React from 'react'
import Blog from '../../Components/Blog/Blog'
import { useQuery } from '@tanstack/react-query';
import { ListBlog } from '../../utils/api/blog.api';

const Home = () => {

  const BlogListQuery = useQuery({
		queryKey: ["blogs"],
		queryFn: ListBlog,
	});

  return (
    <div>
        <div className="search_container">
            <input type="text" placeholder='Search...' />
        </div>
        {
          BlogListQuery?.data ? 
          BlogListQuery?.data.map((data)=>(
            <Blog data = {data} key={data.id} />
          )) : null
        }
        {/* Repeated */}
    </div>
  )
}

export default Home