import React, { useRef } from 'react';Add commentMore actions
import { Link } from 'react-router-dom';
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "./CardItem.scss";

export default function CardItem({ item, onToggleFav, isFav }) {
    const saberSnd = useRef(new Audio('/audio/saber-on.mp3'));
    export default function CardItem({ item, entity, isFav, onToggleFav }) {
        const saberSnd = useRef(new Audio("/audio/saber-on.mp3"));
        const playSaber = () => {
            saberSnd.current.currentTime = 0;
            saberSnd.current.play();
            saberSnd.current.play().catch(err => {
                console.warn("Audio bloqueado:", err);
            });
        };

        const { uid, name, entity } = item;
        const typeMap = { people: 'characters', planets: 'planets', vehicles: 'vehicles' };
        const { uid, name } = item;
        const typeMap = {
            people: "characters",
            planets: "planets",
            vehicles: "vehicles"
        };
        const folder = typeMap[entity] || entity;
        const imgUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;
        const placeholder = '/img/placeholder.png';
        const placeholder = "/img/placeholder.png";

        const detalleLink = `/single/${entity}/${uid}`;

        return (
            <li className="col item" onMouseEnter={playSaber}>
                <div
                    className="card-dark entity-container ratio-16x9"
                    onClick={playSaber}
                >
                    <li className="grid-item" onMouseEnter={playSaber}>
                        <div className="card-dark entity-container" onClick={playSaber}>
                            {/* Contenedor de imagen que adapta la altura según la proporción natural */}
                            <div className="image-container">
                                <img
                                    className="image-card"
                                    src={imgUrl}
                                    alt={name}
                                    onError={e => (e.currentTarget.src = placeholder)}
                                    onError={e => {
                                        e.currentTarget.src = placeholder;
                                    }}
                                />
                                <button
                                    className={`entity-fav-btn${isFav ? ' active' : ''}`}
                                    className={`entity-fav-btn${isFav ? " active" : ""}`}
                                    onClick={e => {
                                        e.stopPropagation();
                                        onToggleFav(item);
                                        onToggleFav();
                                    }}
                                    aria-label={isFav ? 'Quitar favorito' : 'Añadir favorito'}
                                    aria-label={isFav ? "Quitar favorito" : "Añadir favorito"}
                                >
                                    ♥
                                    {isFav ? (
                                        <FaHeart size={20} color="#1a1a1a" />
                                    ) : (
                                        <FaRegHeart size={20} color="#ffffff" />
                                    )}
                                </button>
                            </div>

                            {/* Contenedor de texto: nombre centrado debajo de la imagen */}
                            <div className="details-container">
                                <Link to={`/${entity}/${uid}`} className="title-link">
                                    < Link to={detalleLink} className="title-link">
                                        <h3 className="details-container-title">{name}</h3>
                                    </Link>
                            </div>
                        </div>
                </div>
            </li>
        );
    }
