import { render } from '@testing-library/react';

import Card from './Card';

it('should render correctly', async () => {
    const { asFragment } = render(<Card />);
  
    expect(asFragment()).toMatchSnapshot();
});
