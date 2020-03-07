import React from "react";

export default function removeScene(props) {
    return (
        <div>
            <button onClick={props.handleRemove}>Remove scene</button>
        </div>
    );
}
