import React from 'react';
import './Scene.css';
import SceneImage from './SceneImage/SceneImage';
import SceneFiction from './SceneFiction/SceneFiction';
import SceneTitle from './SceneTitle';
import { useTranslation } from 'react-i18next';

export default function Scene({
  scene,
  saveFiction,
  saveTitle,
  saveImage,
  removeImage,
}) {
  const { t } = useTranslation();

  const onRemoveImage = () =>
    removeImage({ sceneId: scene.id, imageId: scene.image?.id });

  return (
    <div className="scene">
      <SceneTitle scene={scene} save={saveTitle} />

      <div className="main">
        <div className="content">
          <SceneFiction scene={scene} save={saveFiction} />
        </div>

        <div className="sidebar">
          <SceneImage scene={scene} save={saveImage} />{' '}
          <button
            className="ui negative labeled icon button"
            onClick={onRemoveImage}
          >
            <i className="delete icon" />
            {t('sceneImage.remove')}
          </button>
        </div>
      </div>
    </div>
  );
}
