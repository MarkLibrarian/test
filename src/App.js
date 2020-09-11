import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomePage from './pages/welcome/WelcomePage';
import EditStoryPage from './pages/story/edit/EditStoryPage';
import ViewStoryPage from './pages/story/view/ViewStoryPage';
import StoriesPage from './pages/story/StoriesPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stories/:storyId/edit">
          <EditStoryPage />
        </Route>
        <Route path="/stories/:storyId">
          <ViewStoryPage />
        </Route>
        <Route path="/stories">
          <StoriesPage />
        </Route>
        <Route path="/">
          <WelcomePage />
        </Route>
      </Switch>
    </Router>
  );
}
