import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import './index.css';

export default function CreatePlaylistForm({ uriTracks }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
	const userId = useSelector((state) => state.auth.user.id);

	const [form, setForm] = useState({
		title: "",
		description: "",
	});

	const [errorForm, setErrorForm] = useState({
		title: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setForm({ ...form, [name]: value });
		setErrorForm({ ...errorForm, [name]: "" });
	};

	const validateForm = () => {
		let isValid = true;

		if (form.title.length < 5) {
			setErrorForm({
				...errorForm,
				title: "Title must be at least 10 characters long",
			});
			isValid = false;
		}

		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			try {
				const responseCreatePlaylist = await createPlaylist(
					accessToken,
					userId,
					{
						name: form.title,
						description: form.description,
					}
				);

				await addTracksToPlaylist(
					accessToken,
					responseCreatePlaylist.id,
					uriTracks
				);

				toast.success("Playlist created successfully");

				setForm({ title: "", description: "" });
			} catch (error) {
				toast.error(error);
			}
		}
	};


  return (
    <div className="create-playlist-form">
        <h2>Create Playlist</h2>

        <form className="form form-playlist" onSubmit={handleSubmit}>         
            <input
			  className="form-search__input input-title-playlist"
              label="Title"
              placeholder="Title of playlist"
              value={form.title}
              id="title-playlist"
              name="title"
              onChange={handleChange}
              error={errorForm.title}
              required
            />
                    
            <textarea
			  className="form-search__input"
              type='textarea'
              label="Description"
              placeholder="Description of playlist"
              value={form.description}
              id="description-playlist"
              name="description"
              onChange={handleChange}
              required
              error={errorForm.description}
            />
          
          <div className="form-playlist__action">
            <button className='btn btn-create-playlist' type="submit">Create</button>
          </div>
        </form>
    </div>
  )
}

