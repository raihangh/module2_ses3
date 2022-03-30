import React, { Component } from 'react'
import Musicbox from '../components/musicbox/musicbox';
import SearchBar from '../components/searchbar/index';
import config from '../lib/config';

export default class Home extends Component {
  state = {
    accessToken: '',
    isAuthorize: false,
    tracks: [],
  }

  getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);

    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    const params = this.getHashParams();
    const { access_token: accessToken } = params;

    this.setState({ accessToken, isAuthorize: accessToken !== undefined })
  }

  getSpotifyLinkAuthorize() {
    const state = Date.now().toString();
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
  }

  onSuccessSearch(tracks) {
    this.setState({ tracks });
  }

  render() {
    return (
      <div className='container' style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: 'center',
      }}>
        {!this.state.isAuthorize && (
          <main className="center">
            <p>Login for next step...</p>
            <a className='btn' href={this.getSpotifyLinkAuthorize()}>Authorize</a>
          </main>
        )}

        {this.state.isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              accessToken={this.state.accessToken}
              onSuccess={(tracks) => this.onSuccessSearch(tracks)}
            />

            <div className="content">
              {this.state.tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards" style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: 'center',
                }}>
                {this.state.tracks.map((song) => (
                  <Musicbox
                    key={song.id}
                    urlimg={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                    urlspotify={song.external_urls.spotify}
                  />
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    );
  }
}