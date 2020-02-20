import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders "Add Scene" component', () => {
    const {getByText} = render(<App/>);
    const addNewScene = getByText(/Add scene/i);
    expect(addNewScene).toBeInTheDocument();
});

test('renders "Remove All Scenes" component', () => {
    const {getByText} = render(<App/>);
    const removeAllScenes = getByText(/Remove all scenes/i);
    expect(removeAllScenes).toBeInTheDocument();
});
