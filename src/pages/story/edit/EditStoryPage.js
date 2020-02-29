import React from "react";
import uuid from "uuid/v4";
import "./EditStoryPage.css";
import Scene from "./Scene";
import AddSceneButton from "./AddSceneButton";
import RemoveAllScenesButton from "./RemoveAllScenesButton";

class EditStoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultStory();

  }

  addNewScene = () => {
    const newScene = {
      title: `Scene #${this.props.story.scenes.length + 1}`,
      id: uuid()
    };
    const newStory = {
      ...this.props.story,
      scenes: [...this.props.story.scenes, newScene]
    };
    this.props.onStoryChange(newStory);
  };

  removeAllScenes = () => {
    const newStory = {
      ...this.props.story,
      scenes: []
    };
    this.props.onStoryChange(newStory);
  };

  removeScene = (id) => {
   const newStory = {
      ...this.props.story,
      scenes: this.props.story.scenes.filter(scene => scene.id !== id)
    };
    this.props.onStoryChange(newStory);
  }

  render() {
    const scenes = this.props.story.scenes.map((scene, i) => (
      <Scene
        key={scene.id}
        scene={scene}
        id={scene.id}
        removeScene={this.removeScene}
      />
    ));

    return (
      <div className="EditStoryPage">
        <aside>
          <AddSceneButton addNewScene={this.addNewScene} />
          <RemoveAllScenesButton removeAllScenes={this.removeAllScenes} />
        </aside>
        <main>{scenes}</main>
      </div>
    );
  }
}

export default EditStoryPage;
