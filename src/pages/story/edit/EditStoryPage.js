import React from 'react';
import './EditStoryPage.css';
import { useParams, useHistory } from 'react-router';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectScenes, selectStory } from '../../../store/stories';
import { removeStory } from '../../../store/stories';
import { Divider } from 'semantic-ui-react';
import Scene from './Scene/Scene';
import StoryTitle from './StoryTitle';

export default withRouter(connect()(EditStoryPage));

function EditStoryPage() {
  const { storyId } = useParams();
  const story = useSelector(selectStory(storyId));
  const scenes = useSelector(selectScenes(storyId));

  const history = useHistory();
  const dispatch = useDispatch();
  const remover = i => {
    dispatch(removeStory({ id: storyId }));
    history.push('/stories');
  };

  const sceneComponents = scenes.map(scene => (
    <React.Fragment key={scene.id}>
      <Scene scene={scene} />

      <Divider />
    </React.Fragment>
  ));

  return (
    <div className="page page-editStory">
      <main>
        <StoryTitle story={story} />
        <Divider />
        {sceneComponents}
        <button className="ui negative labeled icon button" onClick={remover}>
          <i className="delete icon"></i>
          Remove story
        </button>
      </main>
      <aside>&nbsp;</aside>
    </div>
  );
}
