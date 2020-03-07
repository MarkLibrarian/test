import React from "react";
import "./ViewStoryPage.css";

class ViewStoryPage extends React.Component {
    render() {
        return (
            <div className="ViewStoryPage">
                <a-scene raycaster="far: 100; objects: [link];"
                         cursor="rayOrigin: mouse">
                    <a-sky src="/default-image-360.jpg" rotation="0 0 0"/>
                    <a-box material="color:#616161; roughness:0.2; opacity:0.7"
                           width="3"
                           height="0.5"
                           depth="0.05"
                           position="-0.5 0.75 -1.5"
                           side="double">
                        <a-text value={this.props.story.scenes[0].title}
                                width="6"
                                position="-0.8 0.08 0.1"
                                rotation="0 0 0"/>
                    </a-box>
                    <a-link href="/WelcomePage"
                            title="Exit to home page"
                            position="-14 5.0 -8.0"
                            backgroundColor="blue"/>
                    <a-link href="/WelcomePage"
                            title="Go to scene 1"
                            position="-14 0.5 -8.0"/>
                    <a-link href="/WelcomePage"
                            title="Go to scene 2"
                            position="-14 -2.5 -8.0"/>
                </a-scene>
            </div>
        );
    }
}

export default ViewStoryPage;
