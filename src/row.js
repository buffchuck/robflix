import React, { useState, useEffect } from 'react';
import { poster_url } from './poster';
import './row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {
    const [data, setData] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        const fetch = require('node-fetch');
        fetch(fetchUrl) // Use fetchUrl prop
          .then(res => res.json())
          .then(json => {
              setData(json.results);
          })
          .catch(err => console.error('error:' + err));
    }, [fetchUrl]); // Dependency array for useEffect
      
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (data) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(data?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams( new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {data.map(movie => (
                    <img 
                    key={data.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src={`${poster_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
