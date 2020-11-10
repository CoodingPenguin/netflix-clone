import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "Components/Badge";

const Content = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Blank = styled.span`
  margin: 0 5px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Summary = ({ result, isMovie }) => (
  <Content>
    <Cover
      bgImage={
        result.poster_path
          ? `https://image.tmdb.org/t/p/original${result.poster_path}`
          : require("../Assets/noPosterBig.png")
      }
    ></Cover>
    <Data>
      <Title>{isMovie ? result.original_title : result.original_name}</Title>
      <ItemContainer>
        <Item>
          {isMovie
            ? result.release_date.substring(0, 4)
            : result.first_air_date.substring(0, 4)}
        </Item>
        <Divider>•</Divider>
        <Item>{isMovie ? result.runtime : result.episode_run_time[0]} min</Item>
        <Divider>•</Divider>
        <Item>
          {result.genres &&
            result.genres.map((genre, index) =>
              index === result.genres.length - 1
                ? genre.name
                : `${genre.name}  /  `
            )}
        </Item>
      </ItemContainer>
      <ItemContainer>
        <Item>
          <Badge
            title="Website"
            color="black"
            bgColor="#eeeeee"
            url={result.homepage}
          />
        </Item>
        <Blank />
        {isMovie
          ? result.imdb_id && (
              <Item>
                <Badge
                  title="IMDB"
                  color="black"
                  bgColor="#f3ce13"
                  url={`https://www.imdb.com/title/${result.imdb_id}`}
                />
              </Item>
            )
          : result.external_ids.imdb_id && (
              <Item>
                <Badge
                  title="IMDB"
                  color="black"
                  bgColor="#f3ce13"
                  url={`https://www.imdb.com/title/${result.external_ids.imdb_id}`}
                />
              </Item>
            )}
        <Item>
          {result.videos &&
            result.videos.results
              .filter((video) => video.site === "YouTube")
              .map((video, index) => {
                const { id, key, type } = video;
                return (
                  <>
                    <Blank />
                    <Badge
                      key={id}
                      title={`Youtube - ${type}`}
                      color="black"
                      bgColor="#e62117"
                      url={`https://www.youtube.com/watch?v=${key}`}
                    />
                  </>
                );
              })}
        </Item>
      </ItemContainer>
      <Overview>{result.overview}</Overview>
    </Data>
  </Content>
);

Summary.propTypes = {
  result: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    original_title: PropTypes.string,
    original_name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    runtime: PropTypes.number,
    episode_run_time: PropTypes.arrayOf(PropTypes.number),
    genres: PropTypes.shape({
      name: PropTypes.string,
    }),
    homepage: PropTypes.string,
    imdb_id: PropTypes.string,
    external_ids: PropTypes.shape({
      imdb_id: PropTypes.string,
    }),
    videos: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          key: PropTypes.string,
          type: PropTypes.string,
          site: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default Summary;
