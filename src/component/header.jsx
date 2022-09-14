import React from 'react';
import troll from '../assets/troll-face.png'

export default function Header() {
    return (
        <header>
            <div className="icon">
                <img src={troll} />
            </div>
            <h3> Meme Generator </h3>
            <p>  React Course project - 3 </p>
        </header>
    )
}