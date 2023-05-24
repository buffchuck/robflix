import React, { useState, useEffect } from 'react'
import './nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    const checkScroll = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else handleShow(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", checkScroll);
        return () => {
            window.removeEventListener("scroll", checkScroll);
        };
    }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img className='nav_logo' 
        src={process.env.PUBLIC_URL + '/ROBFLIX.png'} 
        alt='Robflix Logo' 
        />

        <img className='nav_avatar' 
        src={process.env.PUBLIC_URL + '/robflix-avatar.png'} 
        alt='Robflix Logo' 
        />
    </div>
  )
}

export default Nav