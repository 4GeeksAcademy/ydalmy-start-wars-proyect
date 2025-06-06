import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../services/swapi.js";
import DetailCard from "../components/DetailCard.jsx";

export default function Single() {
  // 1) useParams para obtener { type, uid } de la URL (“/single/:type/:uid”)Add commentMore actions
  const { type, uid } = useParams();
  const navigate = useNavigate();

  // 2) Estados locales
  const [item, setItem]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    // 3) Validar que type esté en [ "people", "planets", "vehicles" ]Add commentMore actions
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
// 5) Mientras cargaAdd commentMore actions
  if (loading) {
    return <p className="text-center text-light mt-5">Cargando detalles…</p>;
  }
// 6) Si hay errorAdd commentMore actions
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