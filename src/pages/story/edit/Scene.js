import React, { Component } from "react";
import "./Scene.css";
import Image from "./Image";
import StoryText from "./StoryText";

export default class Scene extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.removeScene(this.props.id);
  }
  render() {
    const { scene } = this.props;
    return (
      <div className="Scene">
        <Image scene={scene} />
        <StoryText scene={scene} />
        <button onClick={this.handleRemove}>Remove scene</button>
      </div>
    );
  }
}
