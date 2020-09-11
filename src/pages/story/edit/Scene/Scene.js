import React from 'react';
import './Scene.css';
import { connect, useSelector, useDispatch } from 'react-redux';
import { SceneImage } from './SceneImage/SceneImage';
import SceneFiction from './SceneFiction/SceneFiction';
import {
  selectImage,
  removeScene,
  removeImage
} from '../../../../store/stories';
import SceneTitle from './SceneTitle';

export default connect()(Scene);

function Scene({ scene }) {
  const image = useSelector(selectImage(scene.image));
  const dispatch = useDispatch();
  const removerOfScene = i => {
    dispatch(removeScene({ id: scene.id }));
  };
  const removerOfImage = i => {
    if ('id' !== 'undefined') {
      dispatch(removeImage({ id: image.id }));
    }
  };
  return (
    <div className="scene">
      <SceneTitle scene={scene} />

      <div className="main">
        <div className="content">
          <div>
            <button className="ui positive labeled icon button">
              <i className="save icon"></i>
              Save
            </button>
            <button className="ui blue labeled icon button">
              <i className="undo icon"></i>
              Undo
            </button>
            <button className="ui blue labeled icon button">
              <i className="redo icon"></i>
              redo
            </button>
            <button
              className="ui negative labeled icon button"
              onClick={removerOfScene}
            >
              <i className="delete icon"></i>
              Delete
            </button>
          </div>
          <SceneFiction sceneId={scene.id} />
        </div>

        <div className="sidebar">
          <SceneImage image={image} />
          <button
            className="ui negative labeled icon button"
            onClick={removerOfImage}
          >
            <i className="delete icon"></i>Delete image
          </button>
        </div>
      </div>
    </div>
  );
}
