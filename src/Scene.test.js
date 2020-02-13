import React from 'react';
import {render} from '@testing-library/react';
import Scene from './Scene';

test('displays default text to help guide the story author', () => {
    const {getByText} = render(<Scene/>);
    const defaultText = getByText(/Enter the story for your scene here/i);
    expect(defaultText).toBeInTheDocument();
});
