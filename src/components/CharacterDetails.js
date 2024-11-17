import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const CharacterDetails = () => {
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

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h1>{film.title}</h1>
      <p>{film.description}</p>
      <h2>Characters</h2>
      <ul>
        {film.people.map((url, index) => (
          <li key={index}>
            <Link to={`/character/${url.split('/').pop()}`}>{url}</Link>
          </li>
        ))}
      </ul>
      <h2>Species</h2>
      <ul>
        {film.species.map((url, index) => (
          <li key={index}>
            <Link to={`/species/${url.split('/').pop()}`}>{url}</Link>
          </li>
        ))}
      </ul>
      <h2>Locations</h2>
      <ul>
        {film.locations.map((url, index) => (
          <li key={index}>
            <Link to={`/location/${url.split('/').pop()}`}>{url}</Link>
          </li>
        ))}
      </ul>
      <h2>Vehicles</h2>
      <ul>
        {film.vehicles.map((url, index) => (
          <li key={index}>
            <Link to={`/vehicle/${url.split('/').pop()}`}>{url}</Link>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <Link to="/" className="btn btn-secondary ml-2">Home</Link>
    </div>
  );
};

export default CharacterDetails;