import { render } from '@testing-library/react';

import Loader from './Loader';

it('should render correctly', async () => {
    const { asFragment } = render(<Loader />);
  
    expect(asFragment()).toMatchSnapshot();
});
