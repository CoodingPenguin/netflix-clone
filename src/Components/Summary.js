import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "Components/Badge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 320px;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 100%;
  margin-left: 20px;
  padding: 5px;
`;

const ItemContainer = styled.div`
  margin-bottom: 25px;
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
  <Container>
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
    <Content>
      <Cover
        bgImage={
          result.poster_path
            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
            : require("../Assets/noPosterBig.png")
        }
      ></Cover>
      <Data>
        <ItemContainer>
          <Item>
            <Badge
              key={1}
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
                    key={2}
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
                    key={2}
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
                .slice(0, 3)
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
  </Container>
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
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
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
