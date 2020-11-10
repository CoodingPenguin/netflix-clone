import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "../api";
import Loader from "Components/Loader";
import Message from "Components/Message";
import ReactCountryFlag from "react-country-flag";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Backdrop = styled.div`
  color: white;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent, #111111f2),
    url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
  color: white;
  text-shadow: rgba(10, 10, 10, 0.5) 0 0 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div``;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const ContentContainer = styled.div`
  padding: 30px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 60%;
  margin-bottom: 45px;
`;

const ContentTitle = styled.div`
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 6px;
  margin-bottom: 20px;
  position: relative;
  z-index: 0;
`;

const Dot = styled.div`
  position: absolute;
  height: 7px;
  width: 7px;
  border-radius: 7px;
  top: -4px;
  bottom: 0;
  left: -2px;
  background: #fddb3a;
  opacity: 0.8;
  z-index: -1;
`;

const ContentItem = styled.div`
  padding-left: 20px;
`;

const Overview = styled.p`
  width: 100%;
  font-size: 14px;
  opacity: 0.75;
  line-height: 1.5;
`;

const KeyValueRow = styled.div`
  margin-bottom: 10px;
`;

const Key = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-right: 5px;
`;

const Value = styled.span`
  opacity: 0.75;
  font-size: 14px;
`;

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
      >
        <Title>{isMovie ? result.original_title : result.original_name}</Title>
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
        </ItemContainer>
      </Backdrop>
      <ContentContainer>
        <Content>
          <ContentTitle>
            Overview
            <Dot />
          </ContentTitle>
          <ContentItem>
            <Overview>{result.overview}</Overview>
          </ContentItem>
        </Content>
        <Content>
          <ContentTitle>
              Production
              <Dot />
          </ContentTitle>
          <ContentItem>
            <KeyValueRow>
              <Key>Companies </Key>
              <Value>
              {result.production_companies &&
                result.production_companies.map((company, index) => 
                  index === result.production_companies.length - 1
                    ? company.name
                    : `${company.name}     /     `)
              }
              </Value>
            </KeyValueRow>
            <KeyValueRow>
              <Key>Countries</Key>
              <Value>
                {result.production_countries &&
                  result.production_countries.map((country, index) => 
                    index === result.production_countries.length - 1
                      ?
                      <>
                        <span>{`${country.name}   `}</span>
                        <ReactCountryFlag countryCode={`${country.iso_3166_1}`} svg />
                      </>
                      :
                      <>
                        <span>{`${country.name}   `}</span>
                        <ReactCountryFlag countryCode={`${country.iso_3166_1}`} svg />
                        <span>     /     </span>
                      </>
                    )
                  }
                </Value>
            </KeyValueRow>
          </ContentItem>
        </Content>
      </ContentContainer>
    </Container>
  );
};
