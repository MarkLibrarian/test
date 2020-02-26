import React from "react";
import "./ViewStoryPage.css";
class ViewStoryPage extends React.Component {
  render() {
    return (
      <div className="ViewStoryPage">
        <a-scene
          raycaster="far: 100; objects: [link];"
          cursor="rayOrigin: mouse"
        >
          <a-sky src="/default-image-360.jpg" rotation="0 -130 0" />

          <a-link
            href="/WelcomePage"
            title="Exit to home page"
            position="-14 5.0 -8.0"
            image=""
            geometry=""
            material=""
          ></a-link>
          <a-link
            href="/WelcomePage"
            title="Go to scene 1"
            position="-14 0.5 -8.0"
            image=""
            geometry=""
            material=""
          ></a-link>
          <a-link
            href="/WelcomePage"
            title="Go to scene 2"
            position="-14 -2.5 -8.0"
            image=""
            geometry=""
            material=""
          ></a-link>
        </a-scene>
      </div>
    );
  }
}

export default ViewStoryPage;
