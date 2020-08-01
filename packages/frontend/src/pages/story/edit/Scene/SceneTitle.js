import React, { useState } from 'react';
import './SceneTitle.css';

import { useTranslation } from 'react-i18next';

export default function SceneTitle({ scene, save }) {
  const { t } = useTranslation();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(scene.title);

  const startEditing = () => setEditing(true);

  const saveTitle = () => {
    setEditing(false);
    save({ sceneId: scene.id, title });
  };

  const handleChange = (e) => setTitle(e.target.value);

  const handleCancel = () => setEditing(false);

  const editView = () => {
    return (
      <div>
        <input
          type="text"
          name="title"
          defaultValue={scene.title}
          onChange={handleChange}
        />
        <button onClick={saveTitle}>{t('save')}</button>
        <button onClick={handleCancel}>{t('cancel')}</button>
      </div>
    );
  };

  const defaultView = () => {
    return (
      <React.Fragment>
        <h2 onDoubleClick={startEditing} className="ui inverted header">
          {scene.title}
        </h2>
      </React.Fragment>
    );
  };

  return <div className="scene">{editing ? editView() : defaultView()}</div>;
}
