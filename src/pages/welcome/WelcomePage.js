import React from 'react';
import './WelcomePage.css';
import {Link} from "react-router-dom";

class WelcomePage extends React.Component {
    render() {
        return (
            <div className="WelcomePage">
                <h1>Welcome</h1>
                <ul>
                    <li><Link to="/story/edit">Edit Story</Link></li>
                    <li><Link to="/story/view">View Story</Link></li>
                </ul>
            </div>
        );
    }
}

export default WelcomePage;
