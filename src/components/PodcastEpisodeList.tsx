import { useOutletContext } from "react-router-dom";
import styled from 'styled-components';

import Link from './Link';
import Card from './Card';

const pad2 = (num: number) => num.toString().padStart(2, '0');

const formatTime = (ms: number) => `${pad2(Math.floor(ms / 3600000))}:${pad2(Math.floor((ms % 3600000) / 60000))}:${pad2(Math.floor((ms % 60000) / 1000))}`;

const Container = styled.div`
    width: 70%;
`;

const EpisodeCountCard = styled(Card)`
    font-weight: bold;
    font-size: 2.4rem;
    padding: 2.4rem 1.6rem;
`;

const EpisodeTableCard = styled(Card)`
    margin-top: 1.6rem;
    padding: 1rem 1.6rem;
`;

const EpisodeTable = styled.table`
    width: 100%;
`;

const EpisodeTableRow = styled.tr`
    &:nth-child(2n) {
        background: rgba(0, 0, 0, 0.05);
    }

    &:not(:last-child) {
        border: 0.24rem solid rgba(0, 0, 0, 0.1);
        border-left: 0;
        border-right: 0;
    }
`;

const EpisodeTableHeader = styled.th`
    font-weight: bold;
    padding: 1rem 0;
    text-align: left;

    &:not(:first-child) {
        width: 12rem;
    }
`;

const EpisodeTableCell = styled.td`
    padding: 1rem 0;
`;

const EpisodeTitleLink = styled(Link)`
    color: blue;

    &:hover {
        color: black;
    }
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

const PodcastEpisodeList = () => {
    const { podcast } = useOutletContext<{ podcast: PodcastType }>();

    return <Container>
        <EpisodeCountCard>Episodes: { podcast.episodeCount }</EpisodeCountCard>
        <EpisodeTableCard>
            <EpisodeTable>
                <thead>
                    <EpisodeTableRow>
                        <EpisodeTableHeader>Title</EpisodeTableHeader>
                        <EpisodeTableHeader>Date</EpisodeTableHeader>
                        <EpisodeTableHeader>Duration</EpisodeTableHeader>
                    </EpisodeTableRow>
                </thead>
                <tbody>
                    { Object.entries(podcast.episodesById).map(([episodeId, episode]) => (
                        <EpisodeTableRow data-testid={`podcast-episode-${episodeId}`} key={episodeId}>
                            <EpisodeTableCell><EpisodeTitleLink data-testid="podcast-episode-link" to={ `episode/${episodeId}` }>{episode.title}</EpisodeTitleLink></EpisodeTableCell>
                            <EpisodeTableCell data-testid="podcast-episode-release-date">{new Date(episode.releaseDate).toLocaleDateString()}</EpisodeTableCell>
                            <EpisodeTableCell data-testid="podcast-episode-length">{formatTime(episode.length)}</EpisodeTableCell>
                        </EpisodeTableRow>
                    )) }
                </tbody>
            </EpisodeTable>
        </EpisodeTableCard>
    </Container>;
};

export default PodcastEpisodeList;
