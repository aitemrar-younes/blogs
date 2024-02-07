import React from 'react'
import '/src/assets/Styles/Blog.scss'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";

const Blog = ({data}) => {
    const removeHtmlTags = (htmlString) => {
        const strippedString = htmlString.replace(/<[^>]*>/g, '');
        return strippedString;
      };
    return (
        <div className='__Blog__ card'>
            <img className="blog_image" src={data.thumbnail}/>
            <div className="blog_detail">
                <div className="card_body">
                    <h3 className="title">{data.title}</h3>
                    <div className="date">{data.creation_date} | Category { (data.creation_date != data.modification_date) ? '( updated at '+data.modification_date+' )' : "" } </div>
                    <p className="description clamp_text_2">
                        { removeHtmlTags(data.content) }
                    </p>
                </div>
                <div className="card_footer">
                    <div className="liked">
                        <span>{ data.likes_count }</span>
                        <FaHeart />
                    </div>
                    <Link to={'/blog/'+data.id+'/'}>
                        <button className="btn read_more">Read more</button>
                    </Link>
                </div>
            </div>
        </div>
  )
}

export default Blog