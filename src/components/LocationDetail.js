import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';

const LocationDetail = () => {
  const { id } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/locations/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch location data: ${response.statusText}`);
        }
        const data = await response.json();
        setLocationData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div className="container">
      <h2>{locationData.name}</h2>
      <p><strong>Climate:</strong> {locationData.climate}</p>
      <p><strong>Terrain:</strong> {locationData.terrain}</p>
      <p><strong>Films:</strong> {locationData.films.join(', ')}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <Link to="/" className="btn btn-secondary ml-2">Home</Link>
    </div>
  );
};

export default LocationDetail;