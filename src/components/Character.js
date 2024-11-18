import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Paginator from "./Paginator";
import '../App.css'; 

const Character = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const filmsPerPage = 6;

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const data = await response.json();
        const filmsWithImages = await Promise.all(data.map(async (film) => {
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2d42561c4a6995cc3ad8a479d9eea96d&query=${film.title}`);
          const resData = await res.json();
          const imageUrl = resData.results.length > 0 ? `https://image.tmdb.org/t/p/w500${resData.results[0].poster_path}` : '/default-image.jpg';
          return { ...film, imageUrl };
        }));
        setFilms(filmsWithImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, []);

  const indexOfLastFilm = page * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

  return (
    <div className="App">
      <div className="text-center my-5">
        <h1>
          <Link to="/" className="text-decoration-none text-dark">
            Studio Ghibli Leo Parra G
          </Link>
        </h1>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="movies">
          {currentFilms.map((film) => (
            <div className="movie" key={film.id}>
              <img src={film.imageUrl} alt={film.title} />
              <div className="movie-title">
                <p>{film.title}</p>
              </div>
              <div className="movie-director">
                <p>Director: {film.director}</p>
              </div>
              <Link to={`/films/${film.id}`} className="movie-detailsBtn">
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
      <Paginator
        info={{ next: page < Math.ceil(films.length / filmsPerPage), prev: page > 1 }}
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(films.length / filmsPerPage)}
      />
    </div>
  );
};

export default Character;
