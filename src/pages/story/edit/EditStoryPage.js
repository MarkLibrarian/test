import React from "react";
import uuid from "uuid/v4";
import "./EditStoryPage.css";
import Scene from "./Scene";
import AddSceneButton from "./AddSceneButton";
import RemoveAllScenesButton from "./RemoveAllScenesButton";
import { defaultStory } from "../../../model";
class EditStoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultStory();
    this.removeScene = this.removeScene.bind(this);
  }

  addNewScene = () => {
    this.setState(state => {
      const newScene = {
        name: `Scene #${state.scenes.length + 1}`,
        id: uuid()
      };
      return {
        scenes: [...this.state.scenes, newScene]
      };
    });
  };

  removeAllScenes = () => {
    this.setState({ scenes: [] });
  };
  removeScene(id) {
    this.setState({
      scenes: this.state.scenes.filter(scene => scene.id !== id)
    });
  }
  render() {
    const scenes = this.state.scenes.map((scene, i) => (
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
