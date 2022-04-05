import React, { useState } from 'react';
import './index.css'
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function SearchBar({ onSuccess, onClearSearch }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      toast.error(e);
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div>
      <form className="form-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="form-search__input"
          required
          value={text}
          onChange={handleInput}
        />
        <button className='btn-search' type="submit">Search</button>
      </form>

      {!isClear && (
        <button onClick={handleClear} className="btn-clear">Clear search</button>
      )}
    </div>
  )
}


// export default class SearchBar extends Component {
//   state = {
//     text: '',
//   }

//   handleInput(e) {
//     this.setState({ text: e.target.value });
//   }

//   async onSubmit(e) {
//     e.preventDefault();

//     const { text } = this.state;

//     var requestOptions = {
//       headers: {
//         'Authorization': 'Bearer ' + this.props.accessToken,
//         'Content-Type': 'application/json',
//       },
//     };

//     try {
//       const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
//         .then((data) => data.json());

//       const tracks = response.tracks.items;
//       this.props.onSuccess(tracks);
//     } catch (e) {
//       alert(e);
//     }

//     e.target.blur();
//   }

//   render() {
//     return (
//       <form className="form-search" onSubmit={(e) => this.onSubmit(e)}>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="form-search__input"
//           required
//           onChange={(e) => this.handleInput(e)}
//         />
//         <button className='btn btn-search' type='submit'>Search</button>
//       </form>
//     )
//   }
// }