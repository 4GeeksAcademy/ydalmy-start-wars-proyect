
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';           // opcional landingAdd commentMore actions
import Personajes from './pages/Personajes';
import Planetas   from './pages/Planetas';
import Vehiculos  from './pages/Vehiculos';
import Favorites  from './pages/Favoritos';
import Layout     from "./pages/Layout.jsx";
import Personajes from "./pages/Personajes.jsx";
import Planetas   from "./pages/Planetas.jsx";
import Vehiculos  from "./pages/Vehiculos.jsx";
import Favoritos  from "./pages/Favoritos.jsx";
import Single     from "./pages/Single.jsx";
export default function App() {
  return (
    
    <Routes>
      {/*
        Montamos Layout como ruta principal en "/".
        Dentro de Layout, un <Outlet /> inyectará las páginas hijas.
      */}
      <Route path="/" element={<Layout />}>
        {/* Si la URL es exactamente "/", redirige a "/personajes" */}
        <Route index element={<Navigate to="personajes" replace />} />

        {/* Rutas de lista */}
        <Route path="personajes" element={<Personajes />} />
        <Route path="planetas"   element={<Planetas />} />
        <Route path="vehiculos"  element={<Vehiculos />} />
        <Route path="favoritos"  element={<Favoritos />} />

        {/*
          Ruta dinámica de detalle:
          "/single/:type/:uid"
          - type = "people" | "planets" | "vehicles"
          - uid  = ID (ej. "3", "14", ...)
        */}
        <Route path="single/:type/:uid" element={<Single />} />

        {/* Cualquier otra ruta redirige a "/personajes" */}
        <Route path="*" element={<Navigate to="personajes" replace />} />
      </Route>
    </Routes>
  );
}