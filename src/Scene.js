import React, { Component } from "react";
import "./Scene.css";
import Image from './Image'
import StoryText from './StoryText'
import RemoveSceneButton from './RemoveSceneButton.js'

export default class Scene extends Component {
    removeScene = () => {
            alert("Functionality will soon be added to remove this scene")
    };
    render() {
       

        const {scene} = this.props;
        return (
            <div className="Scene">
                <Image scene={scene}/>
                <RemoveSceneButton removeScene={this.removeScene} />
                <StoryText scene={scene}/>
             
            </div>
        );
    }
}
