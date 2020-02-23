import React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import EditStoryPage from "./pages/story/edit/EditStoryPage";
import ViewStoryPage from "./pages/story/view/ViewStoryPage";
import WelcomePage from "./pages/welcome/WelcomePage";

export default function () {
    return (
        <Router>
            <Switch>
                <Route path='/story/edit'>
                    <EditStoryPage/>
                </Route>
                <Route path='/story/view'>
                    <ViewStoryPage/>
                </Route>
                <Route path='/'>
                    <WelcomePage/>
                </Route>
            </Switch>
        </Router>
    );
}
