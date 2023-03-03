import { useContext } from "react";
import styled from "styled-components";

import LoadingContext from "../context/LoadingContext";

import Loader from './Loader';

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 2.5rem 0 1.6rem;
    margin: 0 3.2rem;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
    color: blue;
    font-size: 2.8rem;
`;

const FadingLoader = styled(Loader).withConfig({ shouldForwardProp: (prop: string | number) => prop !== 'loading' })`
    opacity: ${(props: { loading: true }) => props.loading ? 1 : 0};
    transition: 0.5s opacity ease-out;
`;

const _Header = () => {
    const [loading] = useContext(LoadingContext);

    return (
        <Header><PageTitle>Podcaster</PageTitle><FadingLoader data-testid="loader" loading={loading} /></Header>
    );
}

export default _Header;
