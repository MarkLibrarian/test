import React from 'react';
import './Image.css';

export default function (props) {
    return (
        <div className="Image">
            <img src="/default-image.jpeg"
                 alt={props.scene.name || 'Scene Image'}/>
            <button>Upload image</button>
        </div>
    )
}
