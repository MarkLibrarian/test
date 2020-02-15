import React, { Component } from "react";
import "./Scene.css";
import Image from './Image'

export default class Scene extends Component {
    render() {
        return (
            <div className="scene">
                <Image/>
                <div>
                    <textarea defaultValue="Enter the story for your scene here"/>
                </div>
            </div>
        );
    }
}
