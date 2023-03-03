import { render, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import PodcastPage from './PodcastPage';

it('should render correctly', async () => {
    const router = createMemoryRouter([{
        path: "/podcast/:podcastId",
        element: <PodcastPage />,
    }],  { initialEntries: [ '/podcast/1664273280' ] });
    const { asFragment, getByTestId } = render(<RouterProvider router={router} />);

    await waitFor(() =>expect(getByTestId('podcast')), { timeout: 10000 });

    expect(getByTestId('podcast-title')).toBeVisible();
    expect(getByTestId('podcast-image')).toBeVisible();
    expect(getByTestId('podcast-author')).toBeVisible();
    expect(getByTestId('podcast-description')).toBeVisible();
});
