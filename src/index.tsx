import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import LoadingContext from './context/LoadingContext';

import Header from './components/Header';
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

const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <LoadingContext.Provider value={ [loading, setLoading] }>
      <Header />
      <RouterProvider router={router} />
    </LoadingContext.Provider>
  )
};

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
