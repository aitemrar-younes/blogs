import React from 'react'
import '/src/assets/Styles/Blog.scss'
import { Link } from 'react-router-dom'
const Blog = ({data}) => {
  return (
    <div className='__Blog__ card'>
        <img className="blog_image" src={data.thumbnail}/>
        <div className="blog_detail">
            <div className="card_body">
                <h3 className="title">{data.title}</h3>
                <div className="date">March 25, 2023 | Tech</div>
                <p className="description clamp_text_2">
                    {data.content}
                </p>
            </div>
            <div className="card_footer">
                <div className="liked">
                    <span>100 Like(s)</span>
                </div>
                <Link to={'/blog-detail'}>
                    <button className="btn read_more">Read more</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Blog