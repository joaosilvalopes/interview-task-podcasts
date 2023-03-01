import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Homepage from './components/Homepage';
import PodcastPage from './components/PodcastPage';
import PodcastEpisodeList from './components/PodcastEpisodeList';
import PodcastEpisode from './components/PodcastEpisode';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/podcast/:podcastId",
    element: <PodcastPage />,
    children: [
      {
        path: "",
        element: <PodcastEpisodeList />,
      },
      {
        path: "episode/:episodeId",
        element: <PodcastEpisode />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
