import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.span`
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: bold;
  color: ${(props) => props.color};
  background: ${(props) => props.bgColor};
  box-shadow: 2px 2px 2px rgba(30, 30, 30, 0.2);
  margin-right: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
`;

const Badge = ({ title, color, bgColor, url }) => (
  <Link href={url} target="_blank">
    <Wrapper color={color} bgColor={bgColor}>
      {title}
    </Wrapper>
  </Link>
);

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Badge;
