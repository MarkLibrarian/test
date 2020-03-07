import React, {Component} from "react";
import "./Scene.css";
import Image from "./Image";
import StoryText from "./StoryText";
import RemoveSceneButton from "./RemoveSceneButton.js";

export default class Scene extends Component {
    removeScene = () => {
        this.props.removeScene(this.props.scene.id);
    };

    render() {
        const {scene} = this.props;
        return (
            <div className="Scene">
                <Image scene={scene}/>
                <StoryText scene={scene}/>
                <RemoveSceneButton handleRemove={this.removeScene}/>
            </div>
        );
    }
}
