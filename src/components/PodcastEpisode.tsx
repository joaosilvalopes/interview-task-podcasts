import { useOutletContext, useParams } from "react-router-dom";
import styled from 'styled-components';

import Card from "./Card";

const Container = styled.div`
    width: 70%;
`;

const EpisodeCard = styled(Card)`
    padding: 3.2rem 1.6rem;
`;

const EpisodeTitle = styled.h2`
    font-size: 3.2rem;
    font-weight: bold;
`;

const EpisodeDescription = styled.p`
    margin-top: 3.2rem;
`;

const EpisodePlayer = styled.audio`
    width: 100%;
    margin-top: 3.2rem;
`;

type PodcastType = {
    title: string,
    author: string,
    image: string,
    description: string,
    episodesById: {
        [key: string]: {
            title: string,
            description: string,
            url: string,
            releaseDate: string,
            length: number,
        }
    },
    episodeCount: number
};

const PodcastEpisode = () => {
    const { episodeId } = useParams();
    const { podcast } = useOutletContext<{ podcast: PodcastType }>();
    const episode = podcast.episodesById[episodeId as string];

    return <Container>
        <EpisodeCard>
            <EpisodeTitle data-testid="podcast-episode-title">{episode.title}</EpisodeTitle>
            <EpisodeDescription data-testid="podcast-episode-description" dangerouslySetInnerHTML={{ __html: episode.description} } />
            <EpisodePlayer controls>
                <source src={episode.url} data-testid="podcast-episode-source" type="audio/mpeg" />
                Your browser does not support the video tag.
            </EpisodePlayer>
        </EpisodeCard>
    </Container>;
};

export default PodcastEpisode;
