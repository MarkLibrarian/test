import React from 'react';
import './StoriesPage.css';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch, withRouter } from 'react-router-dom';
import { newStory } from '../../store/stories';
import { selectStories } from '../../store/stories';
import uid from 'uid';

export default withRouter(connect(null, { newStory })(StoriesPage));

function StoriesPage({ newStory }) {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const history = useHistory();

  const onNewStory = () => {
    const storyId = uid();
    newStory({
      id: storyId,
      title: 'My Story',
      author: 'Alan Smithee'
    });
    history.push(`${url}/${storyId}/edit`);
  };
  return (
    <div className="page page-stories">
      <h1>{t('page.stories.heading')}</h1>
      {listOfStories(url, useSelector(selectStories), t)}
      <button onClick={onNewStory}>{t('action.newStory.text')}</button>
    </div>
  );
}

function listOfStories(url, allStories, t) {
  const stories = allStories.map(story => (
    <li key={`story-${story.id}`} className={`story story-${story.id}`}>
      <Link to={`${url}/${story.id}`} className="view">
        {t('page.story.heading', {
          title: story.title,
          author: story.author
        })}
      </Link>

      <Link to={`${url}/${story.id}/edit`} className="edit">
        {t('page.stories.story.edit')}
      </Link>
    </li>
  ));
  return <ul className="stories">{stories}</ul>;
}
