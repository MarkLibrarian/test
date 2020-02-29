import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import EditStoryPage from "./pages/story/edit/EditStoryPage";
import ViewStoryPage from "./pages/story/view/ViewStoryPage";
import WelcomePage from "./pages/welcome/WelcomePage";
import React, { Component } from 'react';
import { defaultStory } from "./model";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            story: defaultStory()
        };
    }
    onStoryChange =(story) => {
        this.setState({
            ...this.state,
            story
        });
        console.log(story);
        console.log(this.state);
    }
    render() {
        return (
            <Router>
            <Switch>
                <Route path='/story/edit'>
                    <EditStoryPage 
                        story={this.state.story}
                        onStoryChange={this.onStoryChange}/>
                </Route>
                <Route path='/story/view'>
                    <ViewStoryPage/>
                </Route>
                <Route path='/'>
                    <WelcomePage/>
                </Route>
            </Switch>
        </Router>
        )
    }
}


