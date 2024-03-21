import React, { useContext, useState, useEffect } from "react";
import { NRows } from "../Home";
import instance from "./fetching";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Spinner from "../Spinner.gif";

const Row = () => {
  const url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const props = useContext(NRows);
  const [spin,setSpin]=useState(false);

  useEffect(() => {
    async function fetchData() {
        setSpin(true) 
      const request = await instance.get(props.genre);
      setMovies(request.data.results);
      setSpin(false)
    }
    fetchData();
  }, [props.genre]);

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleShowTrailer = async (movie) => {
    try {
      let movieName = movie.name || movie.original_title || movie.original_name;
      const url = await movieTrailer(movieName, { videoType: "movie" });
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
  {spin ? (
   <img src={Spinner} alt="Loading..." style={{ width: "100px", height: "100px" }} />

  ) : (
    <>
      <h2>{props.title}</h2>
      <div className={`row_posters ${props.isLargeRow ? "large_row" : ""}`}>
        {movies.map((e) => (
          <img
            key={e.id}
            className="row_poster m-1"
            src={`${url}${props.isLargeRow ? e.poster_path : e.backdrop_path}`}
            alt={e.name}
            onClick={() => handleShowTrailer(e)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </>
  )}

  {trailerUrl && (
    <div className="video-popup">
      <span className="close" onClick={() => setTrailerUrl("")}>
        &times;
      </span>
      <div className="video-popup-content">
        <YouTube videoId={trailerUrl} opts={opts} />
      </div>
    </div>
  )}
</div>

  );
};

export default Row;