import React, { useState, useEffect } from 'react';
import { poster_url } from './poster';
import './row.css';

function Row({ title, fetchUrl, isLargeRow }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = require('node-fetch');
        fetch(fetchUrl) // Use fetchUrl prop
          .then(res => res.json())
          .then(json => {
              setData(json.results);
          })
          .catch(err => console.error('error:' + err));
    }, [fetchUrl]); // Dependency array for useEffect
      
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {data.map(movie => (
                    <img 
                    key={data.id}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src={`${poster_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}/>
                ))}
            </div>
        </div>
    )
}

export default Row
