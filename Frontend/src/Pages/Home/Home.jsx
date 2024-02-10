import React, { useState } from 'react'
import Blog from '../../Components/Blog/Blog'
import { useQuery } from '@tanstack/react-query';
import { ListBlog } from '../../utils/api/blog.api';

const Home = () => {
  const [page,setPage] = useState(1)
  const [search,setSearch] = useState("")
  const nextPage = () => setPage((prev)=>prev+1)
  const previousPage = () => setPage((prev)=>prev-1)

  const BlogListQuery = useQuery({
		queryKey: ["blogs", page, search],
		queryFn: () => ListBlog(page, search),
	});

  if (BlogListQuery.isLoading)
    return (<h3>Loading ...</h3>)
  if (BlogListQuery.error)
    return (<h3>Error Occurs !!! {console.log(BlogListQuery.error)} </h3>)
  const response = BlogListQuery?.data
  return (
    <div>
      <div className="search_container">
        <input type="text" placeholder="Search..." value={search} onChange={(event)=>setSearch(event.target.value)} />
      </div>
      {response?.results
        ? response.results.map((data) => <Blog data={data} key={data.id} />)
        : null}
      {/* Repeated */}
      <button disabled={!response?.previous} onClick={previousPage}>Previous</button>{" "}
      <span>Page {page}</span> <button disabled={!response?.next} onClick={nextPage}>Next</button>
    </div>
  );
}

export default Home