import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "../api";
import Loader from "Components/Loader";
import Message from "Components/Message";
import ReactCountryFlag from "react-country-flag";
import Badge from "Components/Badge";
import Poster from "Components/Poster";
import Collections from "./Collections";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Backdrop = styled.div`
  color: white;
  width: 100%;
  height: 300px;
  background: linear-gradient(to bottom, transparent, 50%, #111111f2),
    url(${(props) => props.bgImage ? `https://image.tmdb.org/t/p/original${props.bgImage}` : require("../Assets/noBackdrop.png")});
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
  font-weight: 700;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div``;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 5px;
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

  @media only screen and (min-width: 1400px){
    width: 36%;
  }
  @media only screen and (max-width: 640px){
    width: 90%;
  }
`;

const ContentTitle = styled.div`
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 6px;
  margin-bottom: 25px;
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
  margin-right: 15px;
`;

const Value = styled.span`
  opacity: 0.75;
  font-size: 14px;
  line-height: 1.3;
`;

const Blank = styled.div`
  width: 100%;
  height: 20px;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const Iframe = styled.iframe`
  height: 400px;

  @media only screen and (min-width: 1400px){
    height: 500px;
  }
  @media only screen and (max-width: 640px){
    height: 300px;
  }
`;

const Links = styled.div`
  line-height: 2.5;
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
          {isMovie ? result.original_title : result.original_name} | StarWatches
        </title>
      </Helmet>
      <Backdrop
        bgImage={result.backdrop_path}
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
              {result.production_companies && result.production_companies.length > 0 ?
                result.production_companies
                .filter((company, index) => index < 5)
                .map((company, index) => 
                  index === result.production_companies.length - 1 |
                  index === 4
                    ? <span>{company.name}</span>
                    : 
                    <>
                      <span>{company.name}</span>
                      <Divider>/</Divider>
                    </>
                  )
                : "None"
              }
              </Value>
            </KeyValueRow>
            <KeyValueRow>
              <Key>Countries</Key>
              <Value>
                {isMovie ?
                  result.production_countries 
                  && result.production_countries.length > 0
                  && (
                  result.production_countries
                  .filter((country, index) => index < 5)
                  .map((country, index) => 
                    index === result.production_countries.length - 1 |
                    index === 4
                      ?
                      <>
                        {`${country.iso_3166_1}  `}
                        <ReactCountryFlag countryCode={`${country.iso_3166_1}`} svg />
                      </>
                      :
                      <>
                        {`${country.iso_3166_1}  `}
                        <ReactCountryFlag countryCode={`${country.iso_3166_1}`} svg />
                        <Divider>/</Divider>
                      </>
                    )
                  )
                  : 
                  result.origin_country
                  && result.origin_country.length > 0
                  && result.origin_country
                      .filter((country, index) => index < 5)
                      .map((country, index) => 
                        index === result.origin_country.length - 1 |
                        index === 4
                          ?
                            <>
                              {`${country}  `}
                              <ReactCountryFlag countryCode={`${country}`} svg />
                            </>
                          :
                            <>
                              {`${country}  `}
                              <ReactCountryFlag countryCode={`${country}`} svg />
                              <Divider>/</Divider>
                            </>
                        )
                  }
                </Value>
            </KeyValueRow>
            {
              isMovie 
              ? 
              ""
              :
              <>
                <Key>Networks</Key>
                <Value>
                  {              
                  result.networks
                    && result.networks.length > 0
                    && result.networks
                        .filter((network, index) => index < 5)
                        .map((network, index) =>
                          index === result.networks.length - 1 |
                          index === 4
                          ? <span>{network.name}</span>
                          : <>
                              <span>{network.name}</span>
                              <Divider>/</Divider>
                          </>
                        )
                  }
                </Value>
              </>
            }
          </ContentItem>
        </Content>
        <Content>
            <ContentTitle>
              Credits
              <Dot />
            </ContentTitle>
            <ContentItem>
              <KeyValueRow>
                <Key>Crews</Key>
                <Value>
                {result.credits.crew && result.credits.crew.length > 0 ?
                  result.credits.crew
                  .filter((person, index) => index < 5)
                  .map((person, index) => 
                    index === result.credits.crew.length - 1 |
                    index === 4
                      ? <span>{person.name}</span>
                      :
                      <>
                        <span>{person.name}</span>
                        <Divider>/</Divider>
                      </>
                    )
                  : "None"
                  }
                </Value>
              </KeyValueRow>
              <KeyValueRow>
                <Key>Casts</Key>
                <Value>
                {result.credits.cast && result.credits.cast.length > 0 ?
                  result.credits.cast
                  .filter((person, index) => index < 5)
                  .map((person, index) => 
                    index === result.credits.cast.length - 1 |
                    index === 4
                      ? <span>{person.name}</span>
                      :
                      <>
                        <span>{person.name}</span>
                        <Divider>/</Divider>
                      </>
                    )
                  : "None"
                  }
                </Value>
              </KeyValueRow>
            </ContentItem>
          </Content>
        <Content>
          <ContentTitle>
            Links
            <Dot/>
          </ContentTitle>
          <ContentItem>
            <Links>
            {
              result.homepage &&
              <Badge
                key={1}
                title="Website"
                color="black"
                bgColor="#eeeeee"
                url={result.homepage}
            />
            }
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
            {result.videos &&
              result.videos.results
                .filter((video) => video.site === "YouTube")
                .slice(0, 3)
                .map((video, index) => {
                  const { id, key, type } = video;
                  return (
                    <>
                      <Badge
                        key={id}
                        title={`Youtube - ${type}`}
                        color="black"
                        bgColor="#e62117"
                        url={`https://www.youtube.com/watch?v=${key}`}
                      />
                    </>
                  );
                }
              )}
            </Links>
            <Blank />
            {
              result.videos.results 
              && result.videos.results.filter((video) => video.site === "YouTube").length > 0
              && <Iframe 
                  width="100%" 
                  src={`https://www.youtube.com/embed/${result.videos.results.filter((video) => video.site === "YouTube")[0].key}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></Iframe>
            }
          </ContentItem>
        </Content>
        <Content>
          { 
            result.belongs_to_collection 
            ? 
            <>
              <ContentTitle>
                  Series
                  <Dot />
              </ContentTitle>
              <ContentItem>
                <Collections id={result.belongs_to_collection.id} />
              </ContentItem>
            </>
            :
            "" 
          }
          {
            result.seasons
            ?
            <>
              <ContentTitle>
                Seasons
                <Dot />
              </ContentTitle>
              <ContentItem>
                <Grid>
                {result.seasons
                  && result.seasons.length > 0 
                  && result.seasons.map((show, index) => (
                    <Poster
                      key={index}
                      id={show.id}
                      title={show.name}
                      imageUrl={show.poster_path}
                      rating=""
                      isMovie={false}
                      year={
                        show.air_date && show.air_date.substring(0, 4)
                      }
                    />
                ))}
                </Grid>
              </ContentItem>
            </>
            :
            ""
          }
        </Content>
      </ContentContainer>
    </Container>
  );
};
