import React from 'react';
import './EditStoryPage.css';
import Scene from './Scene'
import AddSceneButton from './AddSceneButton';
import RemoveAllScenesButton from './RemoveAllScenesButton';

class EditStoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scenes: []
        }
    }

    addNewScene = () => {
        this.setState((state) => {
            const newScene = {
                number: state.scenes.length,
                name: `Scene #${state.scenes.length + 1}`
            };
            return {
                scenes: [...this.state.scenes, newScene]
            }
        })
    };

    removeAllScenes = () => {
        this.setState({scenes: []});
    };

    render() {
        const scenes = this.state.scenes.map((scene, i) => <Scene key={i} scene={scene}/>);
        return (
            <div className="EditStoryPage">
                <aside>
                    <AddSceneButton addNewScene={this.addNewScene}/>
                    <RemoveAllScenesButton removeAllScenes={this.removeAllScenes}/>
                </aside>
                <main>
                    {scenes}
                </main>
            </div>
        );
    }
}

export default EditStoryPage;
