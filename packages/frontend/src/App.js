import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import WelcomePage from './pages/welcome/WelcomePage';
import EditStoryPage from './pages/story/edit/EditStoryPage';
import StoriesByAuthorPage from './pages/story/StoriesByAuthorPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/story/:storyId/edit">
          <EditStoryPage />
        </Route>
        <Route path="/author/:authorId/stories">
          <StoriesByAuthorPage />
        </Route>
        <Route path="/" exact>
          <WelcomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}
