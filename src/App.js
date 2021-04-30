// import MovieList from "./components/MovieList";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function App() {

  const key = 'a6bf5363'
  const [data, setData] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [searchMovieValue, setSearchMovieValue] = useState("");

  console.log(key)
  const getDataRequest = async (searchMovieValue) => {
    const url = `https://www.omdbapi.com/?s=${searchMovieValue}&apikey=${key}`;
    const response = await fetch(url);
    const movies = await response.json();
    if (movies.Search) {
      setData(movies.Search);
    }
  };

  useEffect(() => {
    getDataRequest(searchMovieValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMovieValue]);

  const addFavoriteMovie = (movie) => {
    const newFavoriteMovie = [...favoriteMovie, movie];
    setFavoriteMovie(newFavoriteMovie);
  };

  return (
    <div id='main-container'className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies"></MovieListHeading>
        <MovieListHeading heading="Favorites"></MovieListHeading>

        <SearchBox
          searchValue={searchMovieValue}
          setSearchMovieValue={setSearchMovieValue}
        ></SearchBox>
      </div>
      <div className='row'>
        <div className='col-6'>
      <DragDropContext>
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
                        <div className="image-container d-flex justify-content-start m-3">
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
                            <p>{movie.Title}</p>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
      </DragDropContext>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
      </div>
      <DragDropContext>
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
                        <div className="image-container d-flex justify-content-start m-3">
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
                            <p>{movie.Title}</p>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
      </DragDropContext>
      </div>
    </div>
  );
}

export default App;
