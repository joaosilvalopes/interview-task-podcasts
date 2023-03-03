import { render, screen } from '@testing-library/react';
import LoadingContext from '../context/LoadingContext';

import Header from './Header';

it('should render correctly when loading context passed as true', async () => {
    const { asFragment, getByTestId } = render(<LoadingContext.Provider value={[true, () => {}]}><Header /></LoadingContext.Provider>);
  
    expect(getByTestId('loader')).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
});

it('should render correctly when loading context passed as false', async () => {
    const { asFragment, getByTestId } = render(<LoadingContext.Provider value={[false, () => {}]}><Header /></LoadingContext.Provider>);
  
    expect(getByTestId('loader')).not.toBeVisible();
    expect(asFragment()).toMatchSnapshot();
});
