import React, { useState, useEffect } from 'react';
import requests from './requests';
import { poster_url } from './poster';
import './banner.css';

function Banner() {

    const [data, setData] = useState([]);

    useEffect (() => {
        const fetch = require('node-fetch');

        fetch(requests.fetchNetflixOriginals) // Use fetchUrl prop
          .then(res => res.json())
          .then(json => {
              setData(json.results[
                Math.floor(Math.random() * json.results.length - 1)
              ]);
          })
          .catch(err => console.error('error:' + err));

    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    return (
        <header className='banner'
        style={{
            backgroundSize: 'cover',
            backgroundImage: `url(
                "${poster_url}${data?.backdrop_path}"
            )`,
                backgroundPosition: "center center"

        }}
        >
            <div className='banner_contents'>
                <h1 className='banner_title'>
                    {data?.title || data?.name || data?.original_name}
                </h1>
                <div>
                    <button className="banner_buttons">Play</button>
                    <button className="banner_buttons">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(data?.overview, 150)}
                </h1>
            </div>
            <div className='banner_fadeBottom'/>
        </header>
    )
}

export default Banner