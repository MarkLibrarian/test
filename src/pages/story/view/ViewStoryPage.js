import React from 'react';
import './ViewStoryPage.css';

class ViewStoryPage extends React.Component {
    render() {
        return (
            <div className="ViewStoryPage">
                <a-scene>
                    <a-sky src="/default-image-360.jpg" rotation="0 -130 0"/>
                    <a-text value="Queen Street, Oxford"
                            width="6"
                            position="-2.5 0.25 -1.5"
                            rotation="0 15 0"/>
                </a-scene>
            </div>
        );
    }
}

export default ViewStoryPage;
