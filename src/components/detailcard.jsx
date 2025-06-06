
import React from "react";
import { useGlobalContext } from "../store/useGlobalReducer.jsx";
import "./DetailCard.scss";

export default function DetailCard({ item, entity }) {
  // 1) Extraer datos de `item`
  const { uid, name, properties } = item;
  // 2) Contexto de favoritosAdd commentMore actions
  const { favorites, addFavorite, removeFavorite } = useGlobalContext();
  const isFav = favorites.some(fav => fav.uid === uid && fav.type === entity);
  const toggleFav = () => {
    if (isFav) removeFavorite({ uid, type: entity });
    else addFavorite({ uid, type: entity, name });
  };
  // 3) Construir URL de la imagenAdd commentMore actions
  const typeMap = {
    people: "characters",
    planets: "planets",
    vehicles: "vehicles"
  };
  const folder = typeMap[entity] || entity;
  const imgUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;
  const placeholder = "/img/placeholder.png";
  // 4) Obtener descripción (si no hay, dejamos cadena vacía "")Add commentMore actions
  const description =
    properties.description?.trim() ||
    // 5) Campos extra según la entidadAdd commentMore actions
    let footerFields = [];
  if (entity === "planets") {
    footerFields = [
      { label: "Climate", value: properties.climate },
      { label: "Terrain", value: properties.terrain },
      { label: "Population", value: properties.population },
      { label: "Orbital Period", value: properties.orbital_period },
      { label: "Rotation Period", value: properties.rotation_period },
      { label: "Diameter", value: properties.diameter }
    ];
  } else if (entity === "people") {
    footerFields = [
      { label: "Gender", value: properties.gender },
      { label: "Birth Year", value: properties.birth_year },
      { label: "Height", value: properties.height },
      { label: "Mass", value: properties.mass },
      { label: "Hair Color", value: properties.hair_color },
      { label: "Skin Color", value: properties.skin_color },
      { label: "Eye Color", value: properties.eye_color }
    ];
  } else if (entity === "vehicles") {
    footerFields = [
      { label: "Model", value: properties.model },
      { label: "Manufacturer", value: properties.manufacturer },
      { label: "Cost (credits)", value: properties.cost_in_credits },
      { label: "Length", value: properties.length },
      { label: "Crew", value: properties.crew },
      { label: "Passengers", value: properties.passengers },
      { label: "Max Speed", value: properties.max_atmosphering_speed },
      { label: "Cargo Capacity", value: properties.cargo_capacity }
    ];
  }
   return (
    <div className="detail-card-wrapper">
      <div className="detail-card">
        {/* === 1) Header: imagen + título + favorito === */}
        <div className="detail-header">
          <div className="detail-image">
            <img
              src={imgUrl}
              alt={name}
              onError={(e) => { e.currentTarget.src = placeholder; }}
            />
          </div>
          <div className="detail-title">
            <h1 className="text-light">{name}</h1>
            <button
              className={`btn btn-outline-warning btn-fav ${isFav ? "active" : ""}`}
              onClick={toggleFav}
              aria-label={isFav ? "Quitar favorito" : "Añadir favorito"}
            >
              {isFav ? "★ Quitar" : "☆ Favorito"}
            </button>
          </div>
           </div>
           {/* === 2) Descripción: solo si existe === */}
        {description && (
          <div className="detail-description">
            <p className="text-light">{description}</p>
          </div>
        )}

        {/* === 3) Línea divisoria: solo si hay descripción o campos extra === */}
        {(description || footerFields.length > 0) && (
          <hr className="detail-divider" />
        )}

        {/* === 4) Footer con campos extra === */}
        {footerFields.length > 0 && (
          <div className="detail-footer">
            {footerFields.map(({ label, value }) =>
              value ? (
                <div key={label} className="footer-item">
                  <span className="footer-label">{label}</span>
                  <span className="footer-value">{value}</span>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

  