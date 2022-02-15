import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import AuthenticationContext from "../contexts/AuthenticationContext";

const UNFILTERED = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`;

const FILTERED = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=`;

export default function Main() {
  let content;
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { currentUser } = useContext(AuthenticationContext);
  let searchBtn;

  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => {
        setMovies(res.data.results);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        if (res.data.results.length == 0) {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  currentUser
    ? (searchBtn = "btn btn-outline-secondary font-weight-bold ")
    : (searchBtn = "btn btn-outline-primary ");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      getMovies(FILTERED + searchTerm);
      setSearchTerm("");
    } else {
      alert("Please log in to make a search");
    }
  };

  if (loading) {
    content = <Loading />;
  } else if (notFound) {
    content = <NotFound />;
  } else {
    content = (
      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
            id={movie.id}
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    getMovies(UNFILTERED);
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="search">
        <input
          className="search-input"
          type="searc"
          placeholder=" Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={searchBtn} type="submit" value="Search">
          Search
        </button>
      </form>
      {content}
    </React.Fragment>
  );
}
