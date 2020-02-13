import React from 'react';
import './App.css';
import Scene from './Scene'
import AddSceneButton from './AddSceneButton';
import RemoveAllScenesButton from './RemoveAllScenesButton';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scenes: []
        }
    }

    addNewScene = () => {
        this.setState((state, props) => {
            const newScene = {title: "My first scene"};
            state.scenes.push(newScene);
            return {
                scenes: this.state.scenes
            }
        })
    };

    removeAllScenes = () => {
        this.setState({scenes: []});
    };

    render() {
        const scenes = this.state.scenes.map((scene, i) => <Scene key={i}/>)
        return (
            <div className="App">
                <header className="App-header">
                    {scenes}
                    <AddSceneButton addNewScene={this.addNewScene}/>
                    <RemoveAllScenesButton removeAllScenes={this.removeAllScenes}/>
                </header>

            </div>
        );
    }
}

export default App;
