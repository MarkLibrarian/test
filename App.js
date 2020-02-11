import React from "react";
import "./App.css";
import Scene from "./Scene";
import AddSceneButton from "./AddSceneButton";
import RemoveAllScenesButton from "./RemoveAllScenesButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenes: []
    };
  }
  addNewScene = e => {
    console.log("Clicked");
    this.setState((state, props) => {
      const newScene = { title: "My first scene" };
      state.scenes.push(newScene);
      return {
        scenes: this.state.scenes
      };
    });
  };
  removeAllScenes = e => {
   
   this.setState({scenes: []});

  };
  render() {
    const scenes = this.state.scenes.map((scene, i) => <Scene key={i} />);
    return (
      <div className="App">
        <header className="App-header">
          {scenes}
          <AddSceneButton addNewScene={this.addNewScene} />
          {/* <p>{this.state.scenes.length}</p> */}
          <RemoveAllScenesButton removeAllScenes={this.removeAllScenes} />
        </header>
      </div>
    );
  }
}
export default App;
