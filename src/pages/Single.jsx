import React, { useEffect, useState } from "react";// Import necessary hooks and components from react-router-dom and other libraries.
import { useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import { getOne } from "../services/swapi";
import DetailCard from "../components/DetailCard";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/swapi.js";
import DetailCard from "../components/DetailCard.jsx";

// Define and export the Single component which displays individual item details.
export default function Single() {
  // Access the global state using the custom hook.
  const { entity, uid } = useParams();
  const [item, setItem] = useState(null);
  const { type, uid } = useParams();
  const navigate = useNavigate();

  // estados locales 
  const [item, setItem]     = useState(null);
  const [loading, setLoading] = useState(true);
   const [error, setError]   = useState(null);

   useEffect(() => {Add commentMore actions
    getOne(entity, uid)
      .then(data => setItem(data))
      .catch(console.error);
  }, [entity, uid]);

  // 3) Validar que type esté en [ "people", "planets", "vehicles" ]

  const validTypes = ["people", "planets", "vehicles"];
    if (!validTypes.includes(type)) {
      setError("Recurso desconocido");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    // 4) Realizar fetch: getOne(type, uid)
  
    getOne(type, uid)
    .then((data) => {
      setItem(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error al cargar detalle:", err);
      setError("No se pudo cargar la información.");
      setLoading(false);
    });
    }, [type, uid]);

    if (!item) {
      // 5) Mientras carga
      if (loading) {
    return <p className="text-center text-light mt-5">Cargando detalles…</p>;
  }

  return <DetailCard item={item} entity={entity} />;
  // 6) Si hay error
  if (error) {
    return (
      <div className="text-center text-light mt-5">
        <p>{error}</p>
        <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
    );
  }
  // 7) Si tenemos `item`, renderizamos DetailCard pasándole item y entity=type
  return (
    <div className="mb-5">
      <DetailCard item={item} entity={type} />
      <div className="mt-3">
        <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
    </div>
  );
}



  



      
