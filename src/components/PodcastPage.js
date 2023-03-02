import { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import styled from "styled-components";

import Card from './Card';

const Main = styled.main`
    display: flex;
    margin-top: 2rem;
`;

const PodcastCardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 30%;
`;

const PodcastCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 80%;
    max-width: 30rem;
`;

const PodcastImage = styled.img`
    width: 70%;
    align-self: center;
`;

const PodcastTitle = styled.p`
    font-weight: bold;
`;

const Author = styled.span`
    margin-top: 0.3rem;

    & > span {
        font-style: italic;
    }
`;

const PodcastDescriptionLabel = styled.p`
    font-weight: bold;
`;

const PodcastDescription = styled.p`
    margin-top: 0.75rem;
`;

const Separator = styled.hr`
    width: 100%;
    border: 0.05rem solid rgba(0, 0, 0, 0.2);
    margin: 1rem 0;
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
        image: details.artworkUrl30,
        description,
        episodesById: episodes.reduce((acc, episode) => ({ ...acc, [episode.trackId]: { url: episode.episodeUrl, description: episode.description.replaceAll('\n', '<br />'), title: episode.trackName, length: episode.trackTimeMillis, releaseDate: episode.releaseDate } }), {}),
        episodeCount: episodes.length
    };

    localStorage.setItem('podcast' + podcastId, JSON.stringify({ value: podcast, ttl: Date.now() + 86000000 }));

    return podcast;
}

const PodcastPage = () => {
    const { podcastId } = useParams();
    const [podcast, setPodcast] = useState(getCachedPodcast(podcastId));

    useEffect(() => {
        if (podcast) {
            return;
        }

        fetchPodcast(podcastId).then(setPodcast).catch(console.log);
    }, [podcastId, podcast, setPodcast]);

    return podcast ? (
        <Main>
            <PodcastCardContainer>
                <PodcastCard>
                    <PodcastImage src={podcast.image} />
                    <Separator />
                    <PodcastTitle>{podcast.title}</PodcastTitle>
                    <Author>by <span>{podcast.author}</span></Author>
                    <Separator />
                    <PodcastDescriptionLabel>Description:</PodcastDescriptionLabel>
                    <PodcastDescription style={{ whiteSpace: 'pre-wrap' }}>{podcast.description}</PodcastDescription>
                </PodcastCard>
            </PodcastCardContainer>
            <Outlet context={{ podcast }} />
        </Main>
    ) : null;
}

export default PodcastPage;