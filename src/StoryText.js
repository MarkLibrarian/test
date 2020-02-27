import React, {Component} from "react";
import "./StoryText.css";

export default class StoryText extends Component {
    constructor(props) {
        super(props);
        this.id = `if-${this.props.scene.number}`;
    }

    render() {
        return (
            <div className="StoryText">
                <label htmlFor={this.id}>
                    Story for <code>{this.props.scene.title}</code>
                </label>
                <textarea id={this.id}
                          rows="13"
                          defaultValue="Enter the story for your scene here"
                />
            </div>
        );
    }
}
