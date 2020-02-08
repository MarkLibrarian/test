import React from 'react';
import './App.css';
import Scene from './Scene'
import AddSceneButton from './AddSceneButton';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      scenes:[]
    }
  }
  addNewScene=(e)=>{
    console.log('Clicked')
    this.setState((state, props)=>{
      const newScene={title: "My first scene"}
      state.scenes.push(newScene)
      return {
        scenes:this.state.scenes
      }
    })
  }
  render(){
    const scenes = this.state.scenes.map((scene, i) => <Scene key={i}/>)
  return (
    <div className="App">
      <header className="App-header">
        {scenes}
        <AddSceneButton addNewScene = {this.addNewScene}/>
        {/* <p>{this.state.scenes.length}</p> */}
      </header>
    </div>
  );
}
}
export default App;
