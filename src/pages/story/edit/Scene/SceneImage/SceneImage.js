import React from 'react';
import './SceneImage.css';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';

export class SceneImage extends React.Component {
  constructor(props) {
    super(props);
    this.image = props.image;
    this.uppy = new Uppy({
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true
    });
  }

  render() {
    return (
      <div className={`scene-image scene-image-${this.image.id}`}>
        <Dashboard
          width={192}
          height={192}
          thumbnailWidth={192}
          uppy={this.uppy}
        />
      </div>
    );
  }
}
