import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "./Loading";
import AuthenticationContext from "../contexts/AuthenticationContext";

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

  const getTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const youtubeUrl = "https://www.youtube.com/embed/";
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  const [iframeClass, setIframeClass] = useState("");
  let trailerContent;

  const { currentUser } = useContext(AuthenticationContext);

  const getVideo = async (API) => {
    setLoading(true);
    await axios
      .get(API)
      .then((res) => {
        const [trailer] = res.data.results;
        const key = trailer.key;
        // console.log(key);
        setTrailer(key);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   getVideo(getTrailer);
  // }, []);

  const handleTrailer = () => {
    currentUser
      ? getVideo(getTrailer)
      : alert("Please log in to make a search");

    // setIframeClass('display: "block"');
  };

  if (loading) {
    trailerContent = <Loading />;
  } else {
    trailerContent = (
      <>
        <iframe
          style={trailer ? { display: "block" } : { display: "none" }}
          // style={{ iframeClass }}
          src={youtubeUrl + trailer}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </>
    );
  }

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
              Watch the Trailer
            </a>
            {trailerContent}
          </h5>
          <p>{overview} </p>
          <h6>Release Date : {release_date} </h6>
        </div>
      </div>
    </React.Fragment>
  );
}
