import { fireEvent, render, waitFor, getByTestId as getByTestIdJest } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoadingContext from '../context/LoadingContext';

import Homepage from './Homepage';

it('should render correctly', async () => {
    const router = createBrowserRouter([{ path: "/", element: <Homepage /> }]);
    const { asFragment, getByTestId, getAllByTestId } = render(<LoadingContext.Provider value={[true, () => {}]}><RouterProvider router={router} /></LoadingContext.Provider>);

    await waitFor(() =>expect(getAllByTestId('podcast')).toHaveLength(100), { timeout: 10000 });

    expect(getByTestId('search-input')).toBeVisible();

    for(const podcast of getAllByTestId('podcast')) {
        expect(getByTestIdJest(podcast, 'podcast-link').getAttribute('href')).toMatch(/^.*\/podcast\/[0-9]+$/);
        expect(getByTestIdJest(podcast, 'podcast-title')).toBeVisible();
        expect(getByTestIdJest(podcast, 'podcast-author')).toBeVisible();
        expect(getByTestIdJest(podcast, 'podcast-image')).toBeVisible();
    }
});

it('should filter by search query', async () => {
    const router = createBrowserRouter([{ path: "/", element: <Homepage /> }]);
    const { asFragment, getByTestId, getAllByTestId } = render(<LoadingContext.Provider value={[true, () => {}]}><RouterProvider router={router} /></LoadingContext.Provider>);

    await waitFor(() =>expect(getAllByTestId('podcast')).toHaveLength(100), { timeout: 10000 });

    const searchInput = getByTestId('search-input');
    const searchQuery = 'at';

    fireEvent.change(searchInput, { target: { value: searchQuery } });

    for(const podcast of getAllByTestId('podcast')) {
        expect(getByTestIdJest(podcast, 'podcast-link').getAttribute('href')).toMatch(/^.*\/podcast\/[0-9]+$/);
        expect(getByTestIdJest(podcast, 'podcast-image')).toBeVisible();

        const title = getByTestIdJest(podcast, 'podcast-title').textContent;
        const author = getByTestIdJest(podcast, 'podcast-author').textContent;
        
        expect(title?.toLowerCase()?.includes?.(searchQuery) || author?.toLowerCase()?.includes?.(searchQuery)).toBe(true);
    }
});
