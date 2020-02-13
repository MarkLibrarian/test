import React from 'react'

export default function () {
    return (
        <div>
                <img src="https://images.unsplash.com/photo-1547546494-07e9b31ad9bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" style={{height:"200px", width: "200px"}} alt ="Scene 1"/>
            <button onClick={()=>console.log('Clicked')}>Upload</button>
        </div>
    )
}
