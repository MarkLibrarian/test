import React from 'react';
import {render} from '@testing-library/react';
import EditStoryPage from './EditStoryPage';
import { defaultStory } from "../../../model";

test('renders "Add Scene" component', () => {
    const {getByText} = render(<EditStoryPage story={defaultStory()}/>);
    const addNewScene = getByText(/Add scene/i);
    expect(addNewScene).toBeInTheDocument();
});

test('renders "Remove All Scenes" component', () => {
    const {getByText} = render(<EditStoryPage story={defaultStory()}/>);
    const removeAllScenes = getByText(/Remove all scenes/i);
    expect(removeAllScenes).toBeInTheDocument();
});
