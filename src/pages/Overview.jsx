import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import Loading from "../components/Loading";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export default function Overview() {
  const location = useLocation();
  const id = location.state.id;
  const poster_path = location.state.poster_path;
  const overview = location.state.overview;
  const title = location.state.title;
  const release_date = location.state.release_date;
  const vote_average = location.state.vote_average;

  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "#7f0000";
    }
  };

  const getTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const youtubeUrl = "https://www.youtube.com/embed/";
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  // const [iframeClass, setIframeClass] = useState("");
  let trailerContent;

  const getVideo = async (API) => {
    setLoading(true);
    await axios
      .get(API)
      .then((res) => {
        const [trailer] = res.data.results;
        const key = trailer.key;
        console.log(key);
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
    getVideo(getTrailer);

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
    <div className="over d-flex p-2">
      <img src={IMG_API + poster_path} className="" alt="" />
      <div className="over-info p-4">
        <h2>
          {title} ({release_date} ){" "}
          <Icon
            className="imdb-icon"
            icon="cib:imdb"
            color={setVoteClass(vote_average)}
            width="30"
          />
          <span>{vote_average}</span>
        </h2>
        <p>{overview}</p>
        <div className="trailer-info">
          <a
            className="trailer"
            onClick={handleTrailer}
            target="_blank"
            rel="noreferrer"
          >
            Watch the Trailer
          </a>
          {trailerContent}
        </div>
      </div>
    </div>
  );
}
