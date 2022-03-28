import React from 'react'
import './musicbox.css'

const musicbox = ({title, artist, urlimg, urlspotify}) => {
  return (
    <div className='musicbox-wrap'>
        <div className="music-content">
            <img className='img-song' src={urlimg} alt={title} />
            <p className='title-song'>{title}</p>
            <p className='artis-song'>{artist}</p>
        </div> 
        <a className='btn btn-blue' href={urlspotify}>click</a>
    </div>
  )
}

export default musicbox