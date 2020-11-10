import React, { useEffect, useState } from "react";
import { movieApi } from "../api";
import styled from "styled-components";
import Poster from "Components/Poster";

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

export default ({ id }) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const loadCollections = async () => {
    try{
      const { 
        data: { 
          parts: result
        }
      } = await movieApi.series(id);
      console.log(result);
      setResult(result);
    }
    catch (e) {
      setError(e);
    }

  }

  useEffect(() => {
    loadCollections();
  }, []);
  
  return (
    <Grid>
      {result 
        && result.map((movie)=>(
          <Poster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={movie.poster_path}
            rating={movie.vote_average}
            isMovie={true}
            year={
              movie.release_date && movie.release_date.substring(0, 4)
            }
          />
        ))}
    </Grid>
  );
};
