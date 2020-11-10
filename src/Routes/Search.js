import React, { useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { movieApi, tvApi } from "../api";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

export default () => {
  const [isFirst, setIsFirst] = useState(true);
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTVResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // onSubmit: searchTerm이 있는지 체크하고 있다면 데이터 로드
  const handleSubmit = (event) => {
    // Enter를 누르면 새로고침되는 것을 방지
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  // onChange: 입력값에 따라 searchTerm을 바꿈
  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTerm(value);
  };

  // API를 호출하여 searchTerm을 갖고 있는 영화, TV쇼 데이터 로드
  const searchByTerm = async () => {
    setLoading(true);
    try {
      // 2-1. 데이터 로드
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      // 2-2. state에 데이터 저장
      setMovieResults(movieResults);
      setTVResults(tvResults);
    } catch {
      setError("Can't find the results.");
    } finally {
      setIsFirst(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Search | StarWatches</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV shows..."
          values={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section title="Movie Results">
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  isMovie={true}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title="TV Show Results">
              {tvResults.map((show) => (
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
          {!isFirst &&
            tvResults &&
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message text="Nothing Found" color="#95a5a6" />
            )}
        </>
      )}
    </Container>
  );
};
