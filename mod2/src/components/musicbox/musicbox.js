import React, { useState } from 'react';
import './musicbox.css'

export default function Track({ urlimg, title, artist, urlspotify, toggleSelect, select }) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className='musicbox-wrap'>
         <div className="music-content">
             <img className='img-song' src={urlimg} alt={title} />
             <p className='title-song'>{title}</p>
             <p className='artis-song'>{artist}</p>
         </div> 
         
         <div className="music-action">
          <a className='btn btn-spotify' href={urlspotify}>Play</a>
          <button className='btn' onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
        </div>
     </div>
  );
}

// const musicbox = ({title, artist, urlimg, urlspotify}) => {
//   return (
//     <div className='musicbox-wrap'>
//         <div className="music-content">
//             <img className='img-song' src={urlimg} alt={title} />
//             <p className='title-song'>{title}</p>
//             <p className='artis-song'>{artist}</p>
//         </div> 
//         <a className='btn btn-blue' href={urlspotify}>click</a>
//     </div>
//   )
// }

// export default musicbox