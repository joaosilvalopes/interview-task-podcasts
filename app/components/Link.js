import { Link } from '@remix-run/react';
import styled from 'styled-components';

const _Link = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default _Link;
