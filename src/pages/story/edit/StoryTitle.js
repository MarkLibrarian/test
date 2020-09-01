import React, {useState} from 'react';
import { updateStoryTitle } from '../../../store/stories';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import './StoryTitle.css';
import { Icon } from 'semantic-ui-react';

export default connect(null, { updateStoryTitle })(StoryTitle);

function StoryTitle({story, updateStoryTitle}) {
    const { t } = useTranslation();
    const {id, title} = story;
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
                type = "text"
                name = "title"
                defaultValue = {title}
                onChange = {handleChange}
            />
            <button onClick = {saveTitle}>Save</button>
            <button onClick = {handleCancel}>Cancel</button>
        </div> 
        )
    }

    const defaultView = () => {
        return(
        <div>
            <h1 title={story.id} className="storyTitle">
                {t('page.story.edit.heading', {
                    title: story.title,
                    author: story.author
                })}
            </h1>
            <Icon name="edit" onClick={startEditing} />
        </div>
        )
    }
   
    return (
        <div>
            {editing ? editView(): defaultView()}
        </div>
    )
}