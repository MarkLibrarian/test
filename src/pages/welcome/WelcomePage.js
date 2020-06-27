import React from 'react';
import './WelcomePage.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(connect()(WelcomePage));

function WelcomePage() {
  const { t } = useTranslation();
  return (
    <div className="page page-welcome">
      <h1>{t('page.welcome.heading')}</h1>
      <ul>
        <li>
          <Link to="/stories">{t('linkTo.stories.text')}</Link>
        </li>
      </ul>
    </div>
  );
}
