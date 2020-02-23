import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('displays the Welcome page by default', () => {
    const {getByText} = render(<App/>);
    const welcomeMessage = getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
});
