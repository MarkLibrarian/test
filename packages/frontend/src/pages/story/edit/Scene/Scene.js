import React from 'react';
import './Scene.css';
import SceneImage from './SceneImage/SceneImage';
import SceneFiction from './SceneFiction/SceneFiction';
import SceneTitle from './SceneTitle';

export default function Scene({ scene, saveFiction, saveTitle, saveImage }) {
  return (
    <div className="scene">
      <SceneTitle scene={scene} save={saveTitle} />

      <div className="main">
        <div className="content">
          <SceneFiction scene={scene} save={saveFiction} />
        </div>

        <div className="sidebar">
          <SceneImage scene={scene} save={saveImage} />
        </div>
      </div>
    </div>
  );
}
