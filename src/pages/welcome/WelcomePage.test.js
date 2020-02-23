import React from 'react';
import {render} from '@testing-library/react';
import WelcomePage from './WelcomePage';

test('displays a welcoming message', () => {
    const {getByText} = render(<WelcomePage/>);
    const welcomeMessage = getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
});
