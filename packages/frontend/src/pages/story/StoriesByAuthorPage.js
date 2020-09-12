import React, { useEffect } from 'react';
import './StoriesByAuthorPage.css';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getStoriesByAuthor,
  selectStoriesByAuthor,
  createStory,
} from '../../store/stories';
import { useParams } from 'react-router';

export default withRouter(connect(null, { createStory })(StoriesByAuthorPage));

function StoriesByAuthorPage({ createStory }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { authorId } = useParams();

  useEffect(() => {
    dispatch(getStoriesByAuthor(authorId));
  }, [authorId, dispatch]);

  const allStories = useSelector(selectStoriesByAuthor);

  return (
    <div className="page page-stories by-author">
      <h1>
        {t('page.storiesByAuthor.heading', {
          author: allStories.author.name,
        })}
      </h1>
      {storiesByAuthor(t, allStories)}

      <button onClick={() => createStory(authorId)}>
        {t('action.newStory.text')}
      </button>
    </div>
  );
}

function storiesByAuthor(t, allStories) {
  const stories = allStories.stories.map((story) => (
    <li key={`story-${story.id}`} className={`story story-${story.id}`}>
      <a href={`/stories/${story.id}`} className="view">
        {story.title}
      </a>
      <a href={`/story/${story.id}/edit`} className="edit">
        {t('page.stories.story.edit')}
      </a>
    </li>
  ));

  return <ul className="stories">{stories}</ul>;
}
