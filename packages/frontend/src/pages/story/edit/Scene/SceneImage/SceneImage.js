import React, { useEffect } from 'react';
import './SceneImage.css';

import { useTranslation } from 'react-i18next';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import Dashboard from '@uppy/react/lib/Dashboard';

export default function SceneImage({ scene, save }) {
  const { t } = useTranslation();

  const uppy = new Uppy({
    id: `scene-image-${scene.id}`,
    restrictions: { maxNumberOfFiles: 1, maxFileSize: 5_000_000 /* bytes */ },
    autoProceed: true,
  })
    .use(XHRUpload, {
      formData: true,
      fieldName: 'scene-image',
      endpoint: `/api/story/${scene.storyId}/scene/${scene.id}/image`,
    })
    .on('file-added', (file) => {
      uppy.setFileMeta(file.id, {
        id: scene.image?.id,
      });
    })
    .on('complete', (result) => {
      save(scene, result.successful[0].uploadURL);
    });

  useEffect(() => () => uppy.close(), [uppy]);

  let content;
  if (scene.image?.thumbnailUrl) {
    content = (
      <img
        src={scene.image.thumbnailUrl}
        alt={t('page.story.edit.sceneImage.textAlt', { title: scene.title })}
      />
    );
  } else {
    content = (
      <Dashboard
        uppy={uppy}
        width={192}
        height={192}
        disableInformer={true}
        proudlyDisplayPoweredByUppy={false}
      />
    );
  }

  return <div className="scene-image">{content}</div>;
}
