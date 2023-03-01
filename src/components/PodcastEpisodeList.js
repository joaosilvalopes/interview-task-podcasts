import { useOutletContext, useNavigate } from "react-router-dom";
import styled from 'styled-components';

import Card from './Card';

const pad2 = (num) => num.toString().padStart(2, '0');

const formatTime = (ms) => `${pad2(Math.floor(ms / 3600000))}:${pad2(Math.floor((ms % 3600000) / 60000))}:${pad2(Math.floor((ms % 60000) / 1000))}`;

const Container = styled.div`
    width: 70%;
`;

const EpisodeCountCard = styled(Card)`
    font-weight: bold;
    font-size: 1.5rem;
    padding: 1.5rem 1rem;
`;

const EpisodeTableCard = styled(Card)`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
`;

const EpisodeTable = styled.table`
    width: 100%;
`;

const EpisodeTableRow = styled.tr`
    &:not(:first-child) {
        cursor: pointer;
    }

    &:nth-child(2n) {
        background: rgba(0, 0, 0, 0.05);
    }

    &:not(:first-child):not(:last-child) {
        border: 0.15rem solid rgba(0, 0, 0, 0.2);
        border-left: 0;
        border-right: 0;
    }
`;

const EpisodeTableHeader = styled.th`
    font-weight: bold;
    padding: 0.5rem 0;
    text-align: left;
`;

const EpisodeTableCell = styled.td`
    padding: 0.5rem 0;
`;

const PodcastEpisodeList = () => {
    const { podcast } = useOutletContext();
    const navigate = useNavigate();

    return <Container>
        <EpisodeCountCard>Episodes: { podcast.episodeCount }</EpisodeCountCard>
        <EpisodeTableCard>
            <EpisodeTable>
                <EpisodeTableRow>
                    <EpisodeTableHeader>Title</EpisodeTableHeader>
                    <EpisodeTableHeader>Date</EpisodeTableHeader>
                    <EpisodeTableHeader>Duration</EpisodeTableHeader>
                </EpisodeTableRow>
                { Object.entries(podcast.episodesById).map(([episodeId, episode]) => (
                    <EpisodeTableRow onClick={ () => navigate(`episode/${episodeId}`) } key={episodeId}>
                        <EpisodeTableCell>{episode.title}</EpisodeTableCell>
                        <EpisodeTableCell>{new Date(episode.releaseDate).toLocaleDateString()}</EpisodeTableCell>
                        <EpisodeTableCell>{formatTime(episode.length)}</EpisodeTableCell>
                    </EpisodeTableRow>
                )) }
            </EpisodeTable>
        </EpisodeTableCard>
    </Container>;
};

export default PodcastEpisodeList;
