import { useContext, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import styled from "styled-components";

import LoadingContext from "../context/LoadingContext";

import Card from './Card';

const Main = styled.main`
    display: flex;
    padding: 3.2rem;
    font-size: 1.6rem;
`;

const PodcastCardContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 30%;
`;

const PodcastCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1.6rem;
    width: 80%;
    max-width: 50rem;
`;

const PodcastImage = styled.img`
    width: 70%;
    align-self: center;
    margin: 1rem 0;
`;

const PodcastTitle = styled.p`
    font-weight: bold;
`;

const Author = styled.span`
    margin-top: 0.5rem;

    & > span {
        font-style: italic;
    }
`;

const PodcastDescriptionLabel = styled.p`
    font-weight: bold;
`;

const PodcastDescription = styled.p`
    margin-top: 1.2rem;
`;

const Separator = styled.hr`
    width: 100%;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    margin: 1.6rem 0;
`;

const getCachedPodcast = (podcastId) => {
    try {
        const cachedPodcast = JSON.parse(localStorage.getItem('podcast' + podcastId));

        return cachedPodcast.ttl && Date.now() < cachedPodcast.ttl ? cachedPodcast.value : null;
    } catch {
        return null;
    }
}

const fetchPodcast = async (podcastId) => {
    const lookupRes = await fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`).then(res => res.json());

    const [details, ...episodes] = lookupRes.results;

    const description = details.feedUrl ? await fetch(`https://cors-anywhere.herokuapp.com/${details.feedUrl}`)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "application/xml"))
        .then(xml => xml.querySelector('description').textContent) : '';

    const podcast = {
        title: details.collectionName,
        author: details.artistName,
        image: `${details.artworkUrl100} 768w, ${details.artworkUrl600} 1200w`,
        description: description.replaceAll('\n', '<br />'),
        episodesById: episodes.reduce((acc, episode) => ({ ...acc, [episode.trackId]: { url: episode.episodeUrl, description: episode.description.replaceAll('\n', '<br />'), title: episode.trackName, length: episode.trackTimeMillis, releaseDate: episode.releaseDate } }), {}),
        episodeCount: episodes.length
    };

    localStorage.setItem('podcast' + podcastId, JSON.stringify({ value: podcast, ttl: Date.now() + 86000000 }));

    return podcast;
}

const PodcastPage = () => {
    const { podcastId } = useParams();
    const [podcast, setPodcast] = useState(getCachedPodcast(podcastId));
    const [_, setLoading] = useContext(LoadingContext);

    useEffect(() => {
        if (podcast) {
            setLoading(false);

            return;
        }

        setLoading(true);

        fetchPodcast(podcastId).then(setPodcast).catch(console.log).finally(() => setLoading(false));
    }, [podcastId, podcast, setPodcast, setLoading]);

    return podcast ? (
        <Main>
            <PodcastCardContainer>
                <PodcastCard>
                    <PodcastImage srcSet={podcast.image} />
                    <Separator />
                    <PodcastTitle>{podcast.title}</PodcastTitle>
                    <Author>by <span>{podcast.author}</span></Author>
                    <Separator />
                    <PodcastDescriptionLabel>Description:</PodcastDescriptionLabel>
                    <PodcastDescription dangerouslySetInnerHTML={{ __html: podcast.description }} />
                </PodcastCard>
            </PodcastCardContainer>
            <Outlet context={{ podcast }} />
        </Main>
    ) : null;
}

export default PodcastPage;