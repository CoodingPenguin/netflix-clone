import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "../api";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Badge from "Components/Badge";
import Summary from "Components/Summary";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 20px 50px;
  display: flex;
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

const Navigator = styled.div`
  width: 10%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid white;
  margin-right: 20px;
`;

const Tab = styled.div`
  width: 100%;
  color: white;
  font-size: 16px;
  text-align: right;
  margin-bottom: 50px;
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
      <Navigator>
        <Tab>{isMovie ? "Movie" : "Show"}</Tab>
        <Tab>Details</Tab>
        <Tab>{isMovie ? "Series" : "Seasons"}</Tab>
      </Navigator>
      <Summary result={result} isMovie={isMovie} />
    </Container>
  );
};
