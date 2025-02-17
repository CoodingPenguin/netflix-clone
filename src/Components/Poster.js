import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  background-color: white;
  border-radius: 4px;
  opacity: 0.8;
  background-position: center center;
  transition: opacity 0.1s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-shadow: #222222 0 0 3px, #fddb3a 0.5px 0 7px, #fddb3a -0.5px 0 7px,
    #fddb3a 0 0.5px 7px, #fddb3a 0 -0.5px 7px;
  color: #eeeeee;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Year = styled.span`
  font-size: 14px;
  margin-top: 5px;
  color: #eeeeee;
  text-shadow: #111111 0 0 4px;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Rating = styled.span`
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 1;
    }
    ${Rating} {
      opacity: 1;
    }
    ${Title} {
      opacity: 1;
    }
    ${Year} {
      opacity: 1;
    }
  }
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../Assets/noPosterSmall.png")
          }
        >
          <Title>{title}</Title>
          <Year>{year}</Year>
        </Image>
        {rating 
          ?
          <Rating>
            <span role="img" aria-label="rating">
              ⭐
            </span>{" "}
            {rating}/10
          </Rating>
          : ""
        }
      </ImageContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
