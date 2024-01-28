import React from 'react'
import Blog from '../../Components/Blog/Blog'

const Home = () => {
  return (
    <div>
        <div className="search_container">
            <input type="text" placeholder='Search...' />
        </div>
        <Blog src={"/src/assets/Images/3840-2160-sample.webp"} />
        <Blog src={"/src/assets/Images/icann-internet-nom-de-domaine.jpg"} />
        <Blog src={"/src/assets/Images/test.webp"} />
        <Blog src={"/src/assets/Images/WebpFeat.jpg"} />
        {/* Repeated */}
        <Blog src={"/src/assets/Images/3840-2160-sample.webp"} />
        <Blog src={"/src/assets/Images/icann-internet-nom-de-domaine.jpg"} />
        <Blog src={"/src/assets/Images/test.webp"} />
        <Blog src={"/src/assets/Images/WebpFeat.jpg"} />
    </div>
  )
}

export default Home