import React from 'react';
import './ViewStoryPage.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default withRouter(connect()(ViewStoryPage));

function ViewStoryPage() {
  const { t } = useTranslation();
  return (
    <div className="page page-viewStory">
      <h1>{t('page.story.view.heading')}</h1>
    </div>
  );
}
