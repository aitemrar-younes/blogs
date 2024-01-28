import React from 'react'
import '/src/assets/Styles/Content.scss'
const Content = ({children}) => {
  return (
    <div className='__Content__'>
        <div className="container">
            {children}
        </div>
    </div>
  )
}

export default Content