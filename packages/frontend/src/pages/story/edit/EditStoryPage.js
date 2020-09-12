import React, { useEffect } from 'react';
import './EditStoryPage.css';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  fetchStory,
  selectStory,
  removeStory,
  removeImage,
  saveSceneTitle,
  saveSceneContent,
  createNewSceneInStory,
} from '../../../store/stories';
import Scene from './Scene/Scene';
import { Divider } from 'semantic-ui-react';

export default withRouter(connect()(EditStoryPage));

function EditStoryPage({ history }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { storyId } = useParams();

  useEffect(() => {
    dispatch(fetchStory(storyId));
  }, [storyId, dispatch]);

  const story = useSelector(selectStory(storyId));

  const saveFiction = ({ sceneId, fiction }) =>
    dispatch(saveSceneContent({ storyId, sceneId, content: fiction }));

  const saveTitle = ({ sceneId, title }) =>
    dispatch(saveSceneTitle({ storyId, sceneId, title }));

  const saveImage = (scene) => {
    // to "save" we just re-fetch the story which will have the new image
    dispatch(fetchStory(scene.storyId));
  };

  const removeImageFromScene = ({ sceneId, imageId }) => {
    dispatch(removeImage({ storyId, sceneId, imageId }));
  };

  const onRemoveStory = () => {
    dispatch(removeStory({ storyId }));
    history.push('/');
  };

  const createNewScene = () => dispatch(createNewSceneInStory({ storyId }));

  const sceneComponents = (story?.scenes || []).map((scene) => (
    <React.Fragment key={scene.id}>
      <Scene
        scene={scene}
        saveTitle={saveTitle}
        saveFiction={saveFiction}
        saveImage={saveImage}
        removeImage={removeImageFromScene}
      />
      <Divider />
    </React.Fragment>
  ));

  return (
    <div className="page page-editStory">
      <main>
        <div className="story-header">
          <h1 className={`story-${story?.id}`}>
            {t(
              story
                ? 'page.story.edit.heading'
                : 'page.story.edit.heading.loading',
              {
                title: story?.title,
              }
            )}
          </h1>
          <a
            href={`/stories/${storyId}`}
            className="view"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('page.story.view.linkTo')}
          </a>
          <button onClick={onRemoveStory} className="ui labeled icon button">
            <i className="delete icon" />
            {t('page.story.edit.removeStory')}
          </button>
          <button onClick={createNewScene} className="ui labeled icon button">
            <i className="plus icon" />
            {t('page.story.edit.addScene')}
          </button>
        </div>
        <Divider />
        {sceneComponents}
      </main>
      <aside>&nbsp;</aside>
    </div>
  );
}
