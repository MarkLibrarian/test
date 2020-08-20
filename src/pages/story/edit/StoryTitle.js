import React, {useState} from 'react';
import { updateStoryTitle } from '../../../store/stories';
import { connect } from 'react-redux';

export default connect(null, { updateStoryTitle })(StoryTitle);

function StoryTitle({story, updateStoryTitle}) {
    const {id, title} = story
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const startEditing = () => {
        setEditing(true);
    }
 
    const saveTitle = () => {
        setEditing(false)
        updateStoryTitle({
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
                type ="text"
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
            <h2 onDoubleClick={startEditing}>{story.title}</h2>
        </div>
        )
    }
   
    return (
        <div>
            {editing ? editView(): defaultView()}
        </div>
    )
}