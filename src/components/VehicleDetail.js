import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/vehicles/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch vehicle data: ${response.statusText}`);
        }
        const data = await response.json();
        setVehicleData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div className="container">
      <h2>{vehicleData.name}</h2>
      <p><strong>Vehicle Class:</strong> {vehicleData.vehicle_class}</p>
      <p><strong>Length:</strong> {vehicleData.length}</p>
      <p><strong>Films:</strong> {vehicleData.films.join(', ')}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <Link to="/" className="btn btn-secondary ml-2">Home</Link>
    </div>
  );
};

export default VehicleDetail;