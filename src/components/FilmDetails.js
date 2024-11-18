import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import '../App.css'; 

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(response => response.json())
      .then(data => {
        setFilm(data);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="container film-details-container">
      {isLoading ? <Loading /> : (
        <div className="card mb-3 film-details-card">
          <img src={film.imageUrl || '/default-image.jpg'} alt={film.title} className="card-img-top film-details-img" />
          <div className="card-body film-details-body">
            <h1 className="card-title film-title">{film.title}</h1>
            <p className="card-text film-description">{film.description}</p>
            <h2 className="film-subtitle">Director: {film.director}</h2>
            <h3 className="film-subtitle">Producer: {film.producer}</h3>
            <h4 className="film-subtitle">Release Date: {film.release_date}</h4>

            <div className="film-info-section">
              <h3 className="film-section-title">Characters</h3>
              <ul>
                {film.people && film.people.map((url, index) => (
                  <li key={index}>
                    <Link to={`/character/${url.split('/').pop()}`} className="detail-link">Character {index + 1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="film-info-section">
              <h3 className="film-section-title">Locations</h3>
              <ul>
                {film.locations && film.locations.map((url, index) => (
                  <li key={index}>
                    <Link to={`/location/${url.split('/').pop()}`} className="detail-link">Location {index + 1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="film-info-section">
              <h3 className="film-section-title">Vehicles</h3>
              <ul>
                {film.vehicles && film.vehicles.map((url, index) => (
                  <li key={index}>
                    <Link to={`/vehicle/${url.split('/').pop()}`} className="detail-link">Vehicle {index + 1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="film-info-section">
              <h3 className="film-section-title">Species</h3>
              <ul>
                {film.species && film.species.map((url, index) => (
                  <li key={index}>
                    <Link to={`/species/${url.split('/').pop()}`} className="detail-link">Species {index + 1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
              <Link to="/" className="btn btn-secondary ml-2">Home</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmDetails;