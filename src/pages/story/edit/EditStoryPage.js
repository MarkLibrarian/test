import React from 'react';
import './EditStoryPage.css';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectScenes, selectStory } from '../../../store/stories';
import { Divider } from 'semantic-ui-react';
import Scene from './Scene/Scene';
import StoryTitle from './StoryTitle';

export default withRouter(connect()(EditStoryPage));

function EditStoryPage() {
  const { t } = useTranslation();

  const { storyId } = useParams();
  const story = useSelector(selectStory(storyId));
  const scenes = useSelector(selectScenes(storyId));

  const sceneComponents = scenes.map(scene => (
    <React.Fragment key={scene.id}>
      <Scene scene={scene} />
      <Divider />
    </React.Fragment>
  ));

  return (
    <div className="page page-editStory">
      <main>
        <h1 title={story.id}>
          {t('page.story.edit.heading', {
            title: story.title,
            author: story.author
          })}
         <StoryTitle story={story}/>
        </h1>
        <Divider />
        {sceneComponents}
      </main>
      <aside>&nbsp;</aside>
    </div>
  );
}
