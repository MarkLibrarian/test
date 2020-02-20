import React, { Component } from "react";
import "./Scene.css";
import Image from './Image'
import StoryText from './StoryText'

export default class Scene extends Component {
    render() {
        const {scene} = this.props;
        return (
            <div className="Scene">
                <Image scene={scene}/>
                <StoryText scene={scene}/>
            </div>
        );
    }
}
