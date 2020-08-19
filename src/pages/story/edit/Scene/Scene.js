import React from 'react';
import './Scene.css';
import { connect, useSelector } from 'react-redux';
import { SceneImage } from './SceneImage/SceneImage';
import SceneFiction from './SceneFiction/SceneFiction';
import { selectImage } from '../../../../store/stories';
import SceneTitle from './SceneTitle'

export default connect()(Scene);

function Scene({ scene }) {
  const image = useSelector(selectImage(scene.image));
  return (
    <div className="scene">
      <SceneTitle scene={scene}/>
      
      <div className="main">
        <div className="content">
          <SceneFiction sceneId={scene.id} />
        </div>
        <div className="sidebar">
          <SceneImage image={image} />
        </div>
      </div>
    </div>
  );
}
