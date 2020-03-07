import React from 'react';
import {render} from '@testing-library/react';
import StoryText from './StoryText';

test('displays default text to guide the story author', () => {
    const scene = Object.freeze({
        id: 1,
        title: 'A Pastoral Scene'
    });

    const {getByText} = render(<StoryText scene={scene}/>);

    const defaultText = getByText(/Enter the story for your scene here/i);
    expect(defaultText).toBeInTheDocument();
});

test('displays the scene name', () => {
    const scene = Object.freeze({
        id: 1,
        title: 'A Pastoral Scene'
    });

    const {getByText} = render(<StoryText scene={scene}/>);

    const sceneName = getByText(/A Pastoral Scene/i);
    expect(sceneName).toBeInTheDocument();
});
