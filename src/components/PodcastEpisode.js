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

const PodcastEpisode = () => {
    const { episodeId } = useParams();
    const { podcast } = useOutletContext();
    const episode = podcast.episodesById[episodeId];

    return <Container>
        <EpisodeCard>
            <EpisodeTitle>{episode.title}</EpisodeTitle>
            <EpisodeDescription dangerouslySetInnerHTML={{ __html: episode.description} } />
            <EpisodePlayer controls>
                <source src={episode.url} type="audio/mpeg" />
                Your browser does not support the video tag.
            </EpisodePlayer>
        </EpisodeCard>
    </Container>;
};

export default PodcastEpisode;
