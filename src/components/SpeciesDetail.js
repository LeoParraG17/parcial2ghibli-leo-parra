import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';

const SpeciesDetail = () => {
  const { id } = useParams();
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/species/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch species data: ${response.statusText}`);
        }
        const data = await response.json();
        setSpeciesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div className="container">
      <h2>{speciesData.name}</h2>
      <p><strong>Classification:</strong> {speciesData.classification}</p>
      <p><strong>Eye Colors:</strong> {speciesData.eye_colors}</p>
      <p><strong>Hair Colors:</strong> {speciesData.hair_colors}</p>
      <p><strong>Films:</strong> {speciesData.films.join(', ')}</p>
      <p><strong>People:</strong> {speciesData.people.join(', ')}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <Link to="/" className="btn btn-secondary ml-2">Home</Link>
    </div>
  );
};

export default SpeciesDetail;