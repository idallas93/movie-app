import React from "react";

const MovieList = ({
  Poster,
  Title,
  favoriteComponent,
  movie,
  handleFavoriteMovieClick


}) => {
  const FavoriteComponent = favoriteComponent;
  return (
    <div className="image-container d-flex justify-content-start m-3">
      <img src={Poster} alt={Title}></img>
      <div
        onClick={() => handleFavoriteMovieClick(movie)}
        className="overlay d-flex align-items-center justify-content-center"
      >
        <FavoriteComponent />
      </div>
    </div>
  );
};


export default MovieList;
