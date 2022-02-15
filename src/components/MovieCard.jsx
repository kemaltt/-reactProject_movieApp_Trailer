import React, { useState, useEffect, useContext } from "react";

import AuthenticationContext from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export default function MovieCard({
  title,
  overview,
  poster_path,
  vote_average,
  id,
  release_date,
}) {
  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  const { currentUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleTrailer = () => {
    if (currentUser) {
      navigate("/overview", {
        state: {
          id,
          poster_path,
          title,
          overview,
          release_date,
          vote_average,
        },
      });
    } else {
      alert("Please log in to make a search");
    }
  };

  return (
    <React.Fragment>
      <div className="movie">
        <img src={`https://image.tmdb.org/t/p/w1280${poster_path}`} alt="" />
        <div className="movie-info">
          <h4>{title} </h4>
          <span className={`tag ${setVoteClass(vote_average)} `}>
            {vote_average}
          </span>
        </div>
        <div className="movie-over">
          <h2>{title} </h2>
          <h5>
            <a
              className="trailer"
              onClick={handleTrailer}
              target="_blank"
              rel="noreferrer"
            >
              More Info
            </a>
            {/* {trailerContent} */}
          </h5>
          <p>{overview} </p>
          <h6>Release Date : {release_date} </h6>
        </div>
      </div>
    </React.Fragment>
  );
}
