import React, { useEffect, useState } from 'react'
import Musicbox from "../../components/musicbox/musicbox";
import SearchBar from "../../components/searchbar";
import CreatePlaylistForm from "../../components/playlistform";
import "./index.css";

const CreatePlaylist = () => {
    const [tracks, setTracks] = useState([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isInSearch, setIsInSearch] = useState(false);
    const [message, setMessage] = useState('No tracks');

  
    useEffect(() => {
      if (!isInSearch) {
        setTracks(selectedTracks);
      }
    }, [selectedTracksUri, selectedTracks, isInSearch]);
  
    const onSuccessSearch = (searchTracks, query) => {
      setIsInSearch(true);
  
      const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));
  
      setTracks(() => {
        const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];
  
        if (_tracks.length === 0) {
          setMessage(`No tracks found with query "${query}"`);
        } else {
          setMessage('');
        }
  
        return _tracks;
      });
    }
  
    const clearSearch = () => {
      setTracks(selectedTracks);
      setMessage('No tracks');
      setIsInSearch(false);
    }
  
    const toggleSelect = (track) => {
      const uri = track.uri;
  
      if (selectedTracksUri.includes(uri)) {
        setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
      } else {
        setSelectedTracksUri([...selectedTracksUri, uri]);
        setSelectedTracks([...selectedTracks, track]);
      }
    }
	return (
		<div className="home">
			<main className="container" id="home">
				<CreatePlaylistForm uriTracks={selectedTracksUri} />

				<hr />

				<SearchBar 
                    onSuccess={onSuccessSearch}
                    onClearSearch={clearSearch}
                />

				<div className="home__cards">
					{tracks.length === 0 && <p>No tracks</p>}

						{tracks.map((data) => (
							<Musicbox
								key={data.id}
								urlimg={data.album.images[0].url}
								title={data.name}
								album={data.album.name}
								artist={data.artists[0].name}
								toggleSelect={() => toggleSelect(data)}
								select={selectedTracksUri.includes(data.uri)}
							/>
						))}
					</div>
			</main>
		</div>
	);
};

export default CreatePlaylist;