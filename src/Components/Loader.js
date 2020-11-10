import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 100x);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 100px;
`;

const Rectangle = styled.div`
  width: 1vh;
  height: 8vh;
  margin: 3px;
  background: white;
  animation: 1.5s scaleUpDownRect ${(props) => props.delay} infinite ease-in-out;

  @keyframes scaleUpDownRect {
    0%,
    45%,
    100% {
      transform: none;
      background: white;
    }
    20% {
      transform: scale(1, 2);
      background: #fddb3a;
    }
  }
`;

export default () => (
  <Container>
    <Rectangle delay="0s" />
    <Rectangle delay="0.2s" />
    <Rectangle delay="0.4s" />
    <Rectangle delay="0.6s" />
    <Rectangle delay="0.8s" />
  </Container>
);
