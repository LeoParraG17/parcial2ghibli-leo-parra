import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';

const CharacterDetail = () => {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://ghibliapi.vercel.app/people/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch character data: ${response.statusText}`);
        }
        const data = await response.json();
        setCharacterData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div>{`Error: ${error}`}</div>;

  return (
    <div className="container">
      <h2>{characterData.name}</h2>
      <p><strong>Age:</strong> {characterData.age}</p>
      <p><strong>Gender:</strong> {characterData.gender}</p>
      <p><strong>Films:</strong> {characterData.films.join(', ')}</p>
      <p><strong>Species:</strong> {characterData.species}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
      <Link to="/" className="btn btn-secondary ml-2">Home</Link>
    </div>
  );
};

export default CharacterDetail;