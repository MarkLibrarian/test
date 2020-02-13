import React, { Component } from "react";
import "./Scene.css";

export default class Scene extends Component {
    render() {
        return (
            <div className="scene">
                Hello Scene!
                <div>
                    <textarea defaultValue="Enter the story for your scene here"/>
                </div>
            </div>
        );
    }
}
