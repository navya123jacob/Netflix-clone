import React, {  useState, useEffect } from 'react';
import instance from './fetching';
import requests from './request';

const Banner = () => {
    const [movie, setMovie] = useState({});
   
    useEffect(() => {
        async function fetchData() {
            const parsed = await instance.get(requests.NetflixOrg);
            const randomIndex = Math.floor(Math.random() * parsed.data.results.length);
            setMovie(parsed.data.results[randomIndex]);
        }
        fetchData();
    }, []);


    return (
      <>
        {Object.keys(movie).length !== 0 && (
          <header className='banner' style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%'
          }}>
          
          
            <div className="banner_contents">
              <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
              <div className="banner_buttons">
                <button className="banner_button btn1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Play" aria-labelledby=":r1c:" aria-hidden="true">
                    <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
                  </svg>
                  <span className="ltr-1vh9doa">Play</span>
                </button>
                <button className="banner_button btn2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="CircleI" aria-labelledby=":r1d:" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
                  </svg>
                  <span className="ltr-1vh9doa ">My Info</span>
                </button>
              </div>
              <h1 className="banner_description">{movie?.overview.substring(0,150)}...</h1>
              
            </div>
            <div className="banner-fadebottom"></div>
          </header>
        )}
      </>
    );
    
}

export default Banner;
