import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const EntityDetail = ({ title }) => {
  const { id } = useParams();
  const [entity, setEntity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(decodeURIComponent(id))
      .then(response => response.json())
      .then(data => {
        setEntity(data);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="container">
      {isLoading ? <Loading /> : (
        <>
          <h1>{title || entity.name || "Unnamed"}</h1>
          <p>{entity.description || "No description available."}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default EntityDetail;
