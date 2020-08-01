import React from 'react';
import './WelcomePage.css';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { selectCurrentAuthor } from '../../store/stories';

export default withRouter(connect()(WelcomePage));

function WelcomePage() {
  const { t } = useTranslation();
  const author = useSelector(selectCurrentAuthor);

  return (
    <div className="page page-welcome">
      <h1>{t('page.welcome.heading')}</h1>
      <ul>
        <li>
          <Link to={`/author/${author.id}/stories`}>
            {t('linkTo.yourStories.text')}
          </Link>
        </li>
      </ul>
    </div>
  );
}
