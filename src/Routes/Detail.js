import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "../api";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Badge from "Components/Badge";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
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

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

// { result, error, loading }
export default ({
  history: { push },
  location: { pathname },
  match: {
    params: { id },
  },
}) => {
  const [result, setResult] = useState([]);
  const [isMovie] = useState(pathname.includes("/movie/"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDetail = async () => {
    const parsedId = parseInt(id);

    // 1. id가 숫자로만 이루어져있는지 체크
    if (isNaN(parsedId)) {
      return push("/");
    }

    // 2. path가 movie인지 show인지 검사 후 데이터 로드
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
      setResult(result);
      console.log(result);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text="The requested URL was not found" color="#95a5a6" />
  ) : (
    <Container>
      <Helmet>
        <title>
          {isMovie ? result.original_title : result.original_name} | Netflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../Assets/noPosterBig.png")
          }
        ></Cover>
        <Data>
          <Title>
            {isMovie ? result.original_title : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {isMovie
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {isMovie ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name}  /  `
                )}
            </Item>
            {isMovie
              ? result.imdb_id && (
                  <>
                    <Divider>•</Divider>
                    <Item>
                      <Badge
                        title="IMDB"
                        color="black"
                        bgColor="#f3ce13"
                        url={`https://www.imdb.com/title/${result.imdb_id}`}
                      />
                    </Item>
                  </>
                )
              : result.external_ids.imdb_id && (
                  <>
                    <Divider>•</Divider>
                    <Item>
                      <Badge
                        title="IMDB"
                        color="black"
                        bgColor="#f3ce13"
                        url={`https://www.imdb.com/title/${result.external_ids.imdb_id}`}
                      />
                    </Item>
                  </>
                )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
  );
};
