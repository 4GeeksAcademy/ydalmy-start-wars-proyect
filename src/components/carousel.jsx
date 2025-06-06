import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardItem from "./CardItem";
import Loader from "./Loader";
import { useGlobalContext } from "../store/useGlobalReducer";
import "./SectionCarousel.scss";

export default function SectionCarousel({
  type,
  title,
  slots = 12,
  forcedItems
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(!forcedItems);
  const { favorites, addFavorite, removeFavorite } = useGlobalContext();
   useEffect(() => {
    if (forcedItems) {
      setItems(forcedItems);
      setLoading(false);
    } else {
      setLoading(true);
      import("../services/swapi")
        .then(({ getAll }) =>
          getAll(type)
            .then(results => {
              setItems(results);
            })
            .catch(() => {
              setItems([]);
            })
            .finally(() => {
              setLoading(false);
            })
        )
        .catch(() => {
          setItems([]);
          setLoading(false);
        });
    }
  }, [type, forcedItems]);

  const toggleFav = item => {
    const exists = favorites.some(
      f => f.uid === item.uid && f.type === type
    );
    if (exists) removeFavorite({ uid: item.uid, type });
    else       addFavorite({ uid: item.uid, type, name: item.name });
  };

  return (
    <section className="databank-section">
      {title && (
        <div className="section-header"></div>
        <h2 className="section-title">{title}</h2>
        </div>
      )}
      {loading ? (
        <ul className="grid-track">
          {Array.from({ length: slots }).map((_, i) => (
            <li key={i} className="grid-item">
              <Loader />
            </li>
          ))}
        </ul>
        ) : (
        <ul className="grid-track">
          {items.slice(0, slots).map(item => (
            <CardItem
              key={`${type}-${item.uid}`}
              item={item}
              entity={type}
              isFav={favorites.some(
                f => f.uid === item.uid && f.type === type
              )}
              onToggleFav={() => toggleFav(item)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

SectionCarousel.propTypes = {
  type:        PropTypes.oneOf(["people", "planets", "vehicles"]).isRequired,
  title:       PropTypes.string.isRequired,
  slots:       PropTypes.number,
  forcedItems: PropTypes.array
};

