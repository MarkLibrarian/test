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
      title: 'My Story'
    });
    history.push(`${url}/${storyId}/edit`);
  };
  return (
    <div className="page page-stories">
      <h1>{t('page.stories.heading')}</h1>
      {listOfStories(url, useSelector(selectStories))}
      <button onClick={onNewStory}>{t('action.newStory.text')}</button>
    </div>
  );
}

function listOfStories(url, allStories) {
  const stories = allStories.map(story => (
    <li key={`story-${story.id}`} className={`story story-${story.id}`}>
      <Link to={`${url}/${story.id}`}>{story.title}</Link>
      &nbsp;|&nbsp;
      <Link to={`${url}/${story.id}/edit`}>Edit</Link>
    </li>
  ));
  return <ul className="stories">{stories}</ul>;
}
