import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import Link from './Link';
import Card from './Card';

const PodcastsUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
`;

const PodcastLi = styled.li`
    position: relative;
    padding-top: 1.5rem;
`;

const PodcastImg = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
`;

const TitleH3 = styled.h3`
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
`;

const AuthorP = styled.p`
    color: grey;
    margin: 0.75rem 0;
    font-weight: bold;
`;

const PodcastContentDiv = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2.5rem;
`;

const PodcastLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Podcast = ({ data }) => (
    <PodcastLi>
        <Link to={`podcast/${data.id}`}>
            <PodcastImg src={data.image} />
            <PodcastContentDiv>
                <TitleH3>{data.title}</TitleH3>
                <br />
                <AuthorP>Author: {data.author}</AuthorP>
            </PodcastContentDiv>
        </Link>
    </PodcastLi>
);

const getCachedPodcast = () => {
    try {
        const cachedPodcasts = JSON.parse(localStorage.getItem('podcasts'));

        return (cachedPodcasts.ttl && Date.now() < cachedPodcasts.ttl && Array.isArray(cachedPodcasts.value)) ? cachedPodcasts.value : null;
    } catch {
        return null;
    }
}

const fetchPodcasts = async () => {
    const res = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/json').then(res => res.json());
    const tommorow = Date.now() + 86000000;
    const podcasts = res.feed.entry;

    const data = {
        value: podcasts.map((podcast) => ({
            title: podcast['im:name'].label,
            author: podcast['im:artist'].label,
            id: podcast.id.attributes['im:id'],
            image: podcast['im:image'][0].label
        })),
        ttl: tommorow,
    }

    localStorage.setItem('podcasts', JSON.stringify(data));

    return data.value;
}

const Homepage = () => {
    const [podcasts, setPodcasts] = useState(getCachedPodcast());
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (podcasts) {
            return;
        }

        fetchPodcasts().then(setPodcasts).catch(console.log);
    }, [podcasts, setPodcasts]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredPodcasts = useMemo(
        () => podcasts?.filter((podcast) => podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) || podcast.author.toLowerCase().includes(searchQuery.toLowerCase())),
        [podcasts, searchQuery]
    );

    return filteredPodcasts ? (
        <main>
             <input type="text" value={searchQuery} onChange={handleSearchInputChange} /> {filteredPodcasts.length}
            <PodcastsUl>{filteredPodcasts.map((podcast) => <Podcast data={podcast} key={podcast.id} />)}</PodcastsUl>
        </main>
    ) : null;
}

export default Homepage;
