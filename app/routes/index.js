import { useState, useMemo, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Link from '../components/Link';
import Card from '../components/Card';

import LoadingContext from '../context/LoadingContext';

const Main = styled.main`
    padding: 3.2rem;
    font-size: 1.6rem;
`;

const PodcastsUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 6rem 1.6rem;
`;

const PodcastLi = styled.li`
    position: relative;
    padding-top: 2.4rem;
`;

const PodcastImg = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 5.5rem;
    height: 5.5rem;
`;

const PodcastTitle = styled.h3`
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
`;

const PodcastAuthor = styled.p`
    color: grey;
    margin: 1.2rem 0;
    font-weight: bold;
    text-align: center;
`;

const PodcastContent = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
`;

const PodcastCount = styled.span`
    display: inline-block;
    border-radius: 1rem;
    padding: 0.5rem;
    font-weight: bold;
    color: white;
    background: blue;
    margin-right: 1rem;
`;

const SearchInput = styled.input`
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: inherit;
`;

const SearchBar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 3rem;
`;

const Podcast = ({ data }) => (
    <PodcastLi>
        <Link to={`podcast/${data.id}`}>
            <PodcastImg srcSet={data.image} />
            <PodcastContent>
                <PodcastTitle>{data.title}</PodcastTitle>
                <br />
                <PodcastAuthor>Author: {data.author}</PodcastAuthor>
            </PodcastContent>
        </Link>
    </PodcastLi>
);

const getCachedPodcasts = () => {
    try {
        const cachedPodcasts = JSON.parse(localStorage.getItem('podcasts'));

        return (cachedPodcasts.ttl && Date.now() < cachedPodcasts.ttl && Array.isArray(cachedPodcasts.value)) ? cachedPodcasts.value : null;
    } catch {
        return null;
    }
}

const fetchPodcasts = async () => {
    const res = await fetch('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/json').then(res => res.json());
    const tommorow = Date.now() + 86000000;
    const podcasts = res.feed.entry;

    const data = {
        value: podcasts.map((podcast) => ({
            title: podcast['im:name'].label,
            author: podcast['im:artist'].label,
            id: podcast.id.attributes['im:id'],
            image: `${podcast['im:image'][0].label} 768w, ${podcast['im:image'][1].label} 992w, ${podcast['im:image'][2].label} 1200w`,
        })),
        ttl: tommorow,
    }

    localStorage.setItem('podcasts', JSON.stringify(data));

    return data.value;
}

const Homepage = () => {
    const [podcasts, setPodcasts] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [_, setLoading] = useContext(LoadingContext);

    useEffect(() => {
        if (podcasts) return;

        const cachedPodcasts = getCachedPodcasts();

        if (cachedPodcasts) {
            setPodcasts(cachedPodcasts);
            setLoading(false);

            return;
        }

        setLoading(true);

        fetchPodcasts().then(setPodcasts).catch(console.log).finally(() => setLoading(false));
    }, [podcasts, setPodcasts, setLoading]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPodcasts = useMemo(
        () => podcasts?.filter((podcast) => podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) || podcast.author.toLowerCase().includes(searchQuery.toLowerCase())),
        [podcasts, searchQuery]
    );

    return filteredPodcasts ? (
        <Main>
            <SearchBar>
                <PodcastCount>{filteredPodcasts.length}</PodcastCount>
                <SearchInput type="text" placeholder="Filter podcasts..." value={searchQuery} onChange={handleSearchInputChange} />
            </SearchBar>
            <PodcastsUl>{filteredPodcasts.map((podcast) => <Podcast data={podcast} key={podcast.id} />)}</PodcastsUl>
        </Main>
    ) : null;
}

export default Homepage;
