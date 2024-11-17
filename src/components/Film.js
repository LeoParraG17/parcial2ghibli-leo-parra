import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import './App.css'; // Import the CSS file for styling

const Film = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(response => response.json())
      .then(data => {
        setFilms(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="m-5 text-center">
        <h1 className="fs-1">Studio Ghibli Films</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-2">
        {isLoading ? <Loading /> : films.map(film => (
          <div className="col" key={film.id}>
            <div className="card mb-3">
              <img
                src={film.imageUrl || '/default-image.jpg'}
                className="card-img-top"
                alt={film.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/films/${film.id}`} className="text-decoration-none">{film.title}</Link>
                </h5>
                <p className="card-text">{film.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Film;