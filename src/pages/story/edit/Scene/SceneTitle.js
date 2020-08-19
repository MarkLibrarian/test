import React, {useState} from 'react';
import './SceneTitle.css';
import { updateSceneTitle } from '../../../../store/stories';
import { connect } from 'react-redux';

export default connect(null, { updateSceneTitle })(SceneTitle);

function SceneTitle({scene, updateSceneTitle}) {
    const {id, title} = scene
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const startEditing = () => {
        setEditing(true);
    }
 
    const saveTitle = () => {
        setEditing(false)
        updateSceneTitle({
            id,
            updatedTitle: newTitle
        }) 
    }

   const handleChange =(e) => {
        const {value} = e.target
        setNewTitle (value)
    } 

    const handleCancel =()=>{
        setEditing(false)
    }

    const editView = () => {
        return(
        <div>
            <input 
                type = "text"
                name ="title"
                defaultValue={title}
                onChange={handleChange}
            />
            <button onClick={saveTitle}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div> 
        )
    }

    const defaultView = () => {
        return(
        <div>
            <h2 onDoubleClick={startEditing}>{scene.title}</h2>
        </div>
        )
    }
   
    return (
        <div className="scene">
            {editing ? editView(): defaultView()}
        </div>
    )
}

