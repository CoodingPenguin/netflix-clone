import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const Title = styled.h1`
  margin-right: 20px;
  font-size: 20px;
  font-family: "Gugi";
  color: #fddb3a;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  font-size: 14px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#fddb3a" : "transparent")};
  color: ${(props) => (props.current ? "white" : "rgba(255, 255, 255, 0.5)")};
  transition: border-bottom 0.5s ease-in-out, color 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <Title>
      <SLink to="/">StarWatches</SLink>
    </Title>
    <List>
      <Item current={pathname === "/" | pathname.startsWith('/movie')}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv" | pathname.startsWith('/show')}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
