import styled from "styled-components";

const RING_SIZE = 3.1;
const CIRCLE_SIZE = 1.5;

const Container = styled.div`
    position: relative;
    width: ${RING_SIZE}rem;
    height: ${RING_SIZE}rem;
`;

const Circle = styled.div`
    position: absolute;
    top: ${RING_SIZE / 2 - CIRCLE_SIZE / 2}rem;
    left: ${RING_SIZE / 2 - CIRCLE_SIZE / 2}rem;
    width: ${CIRCLE_SIZE}rem;
    height: ${CIRCLE_SIZE}rem;
    border-radius: 50%;
    background-color: blue;
`;

const Ring = styled.div`
    @keyframes pulsate {
        0% {
            transform: scale(0.1, 0.1);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1.2, 1.2);
            opacity: 0;
        }
    }

    position: absolute;
    top: 0;
    left: 0;
    height: ${RING_SIZE}rem;
    width: ${RING_SIZE}rem;
    border: 0.3rem solid blue;
    border-radius: 50%;
    animation: pulsate 1s ease-out infinite; 
    opacity: 0;
`;

const Loader = (props) => (
    <Container {...props}>
        <Ring></Ring>
        <Circle></Circle>
    </Container>
)

export default Loader;
