//dependencies
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  //state defined and api key listed  (api key is visible on frontend which is bad practice but left here as OMDB API is free)
  const key = "a6bf5363";
  const [data, setData] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [searchMovieValue, setSearchMovieValue] = useState("");
  const [sort, setSort] = useState(false);

  //async function to hit API endpoint
  const getDataRequest = async (searchMovieValue) => {
    //endpoint is hit dynamically based on the search movie value input by the user
    const url = `https://www.omdbapi.com/?s=${searchMovieValue}&apikey=${key}`;
    const response = await fetch(url);
    const movies = await response.json();
    if (movies.Search) {
      setData(movies.Search);
    }
  };

  //use effect rungs getDataRequest function and takes the searchMovieValue as an input, sets data as response from API endpoint
  useEffect(() => {
    getDataRequest(searchMovieValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovieValue]);

  //function to handle adding new movie to favorite list
  const addFavoriteMovie = (movie) => {
    const newFavoriteMovie = [...favoriteMovie, movie];
    setFavoriteMovie(newFavoriteMovie);
  };

  // dnd beautiful handleOnDragEnd function, this handles where a list item is placed when the drag ends 
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  }

  // dnd beautiful handleOnDragEnd function, this handles where a list item is placed when the drag ends, this one handles the favorites favorites list
  function handleOnDragEnd2(result) {
    if (!result.destination) return;
    const items = Array.from(favoriteMovie);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFavoriteMovie(items);
  }

  //if the sort state is false (sort button not pushed) render this 
  if (!sort) {
    return (
      <div id="main-container" className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies"></MovieListHeading>
          <MovieListHeading heading="Favorites"></MovieListHeading>

          <SearchBox
            searchValue={searchMovieValue}
            setSearchMovieValue={setSearchMovieValue}
          ></SearchBox>
        </div>
        <button
          id="sort-button"
          type="button"
          className="btn btn-light"
          onClick={() => {
            setSort(!sort);
          }}
        >
          Click to sort movies by release date
        </button>

        <div className="row">
          <div className="col-6">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="movies">
                {(provided) => (
                  <ul
                    className="movies"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {data.map((movie, index) => {
                      return (
                        <Draggable
                          key={movie.imdbID}
                          draggableId={movie.imdbID}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              id="card-container"
                              className="image-container d-flex justify-content-start m-3"
                            >
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <img src={movie.Poster} alt={movie.Title}></img>
                                <div
                                  onClick={() => addFavoriteMovie(movie)}
                                  className="overlay d-flex align-items-center justify-content-center"
                                >
                                  <AddFavorites />
                                </div>
                                <p>Title: {movie.Title}</p>
                                <p>Release Year: {movie.Year}</p>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="row d-flex align-items-center mt-4 mb-4"></div>
          <DragDropContext onDragEnd={handleOnDragEnd2}>
            <Droppable droppableId="movies">
              {(provided) => (
                <ul
                  className="movies"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {favoriteMovie.map((movie, index) => {
                    return (
                      <Draggable
                        key={movie.imdbID}
                        draggableId={movie.imdbID}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            id="card-container"
                            className="image-container d-flex justify-content-start m-3"
                          >
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <img src={movie.Poster} alt={movie.Title}></img>
                              <div
                                onClick={() => addFavoriteMovie(movie)}
                                className="overlay d-flex align-items-center justify-content-center"
                              >
                                <AddFavorites />
                              </div>
                              <p>Title: {movie.Title}</p>
                              <p>Release Year: {movie.Year}</p>
                            </li>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
      //if the sort state is true (sort button is pushed) render this 

  } else {
    return (
      <div id="main-container" className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies"></MovieListHeading>
          <MovieListHeading heading="Favorites"></MovieListHeading>

          <SearchBox
            searchValue={searchMovieValue}
            setSearchMovieValue={setSearchMovieValue}
          ></SearchBox>
        </div>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            setSort(!sort);
          }}
        >
          Click to sort movies by release date
        </button>

        <div className="row">
          <div className="col-6">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="movies">
                {(provided) => (
                  <ul
                    className="movies"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {data
                      .sort((a, b) => a.Year.localeCompare(b.Year))
                      .map((movie, index) => {
                        return (
                          <Draggable
                            key={movie.imdbID}
                            draggableId={movie.imdbID}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                id="card-container"
                                className="image-container d-flex justify-content-start m-3"
                              >
                                <li
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                  ></img>
                                  <div
                                    onClick={() => addFavoriteMovie(movie)}
                                    className="overlay d-flex align-items-center justify-content-center"
                                  >
                                    <AddFavorites />
                                  </div>
                                  <p>Title: {movie.Title}</p>
                                  <p>Release Year: {movie.Year}</p>
                                </li>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="row d-flex align-items-center mt-4 mb-4"></div>
          <DragDropContext onDragEnd={handleOnDragEnd2}>
            <Droppable droppableId="movies">
              {(provided) => (
                <ul
                  className="movies"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {favoriteMovie
                    .sort((a, b) => a.Year.localeCompare(b.Year))
                    .map((movie, index) => {
                      return (
                        <Draggable
                          key={movie.imdbID}
                          draggableId={movie.imdbID}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              id="card-container"
                              className="image-container d-flex justify-content-start m-3"
                            >
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <img src={movie.Poster} alt={movie.Title}></img>
                                <div
                                  onClick={() => addFavoriteMovie(movie)}
                                  className="overlay d-flex align-items-center justify-content-center"
                                >
                                  <AddFavorites />
                                </div>
                                <p>Title: {movie.Title}</p>
                                <p>Release Year: {movie.Year}</p>
                              </li>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;

