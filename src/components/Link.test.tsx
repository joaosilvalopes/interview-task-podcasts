import { render } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Link from './Link';

it('should render correctly', async () => {
    const props = { to: "/" };
    const router = createBrowserRouter([{ path: "/", element: <Link { ...props } /> }]);
    const { asFragment, container } = render(<RouterProvider router={router} />);
    
    expect(container.firstElementChild?.getAttribute?.('href')).toBe('/');
    expect(asFragment()).toMatchSnapshot();
});
