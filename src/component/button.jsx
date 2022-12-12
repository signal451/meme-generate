import React from 'react';


export default function Button(props) {

    return (
        <button className='form-button' onClick={props.func}>
            Get a new meme image
        </button>
    )
}