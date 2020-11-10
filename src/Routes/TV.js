import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { tvApi } from "../api";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

export default () => {
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTV = async () => {
    try {
      // 1. api를 호출하여 데이터를 로드
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      // 2. state에 데이터 저장
      setTopRated(topRated);
      setPopular(popular);
      setAiringToday(airingToday);
    } catch {
      setError("Can't find TV information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTV();
  }, []);

  return (
    <>
      <Helmet>
        <title>TV Shows | StarWatches</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  isMovie={false}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  isMovie={false}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {airingToday && airingToday.length > 0 && (
            <Section title="Airing Today">
              {airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.original_name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  isMovie={false}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} color="#e74c3c" />}
        </Container>
      )}
      )
    </>
  );
};
