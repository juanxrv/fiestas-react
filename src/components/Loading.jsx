import React from 'react'
import './Loading.css'

const Loading = ({ loading }) => {
    return (
        <div className={`spinner-container ${loading ? 'visible' : 'hidden'}`}>
          <div className="spinner"></div>
        </div>
      )
}

export default Loading