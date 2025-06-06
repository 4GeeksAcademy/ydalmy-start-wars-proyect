
const BASE = "https://www.swapi.tech/api";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SWAPI error ${res.status}`);
  return res.json();
}

/**
 * Trae todos los ítems de un recurso y devuelve array de { uid, name, entity }.
 * Acepta tanto la forma `data.results` como `data.result.results`
 */
export async function getAll(resource) {
    const data = await fetchJson(`${BASE}/${resource}?page=1&limit=12`);

  // caso 1: respuesta en data.results
  if (Array.isArray(data.results)) {
    return data.results.map(item => ({
      uid:    item.uid,
      name:   item.name    || item.title || item.properties?.name,
      entity: resource
    }));
  }

  // caso 2: respuesta en data.result.results (swapi.tech según docs)
  if (data.result && Array.isArray(data.result.results)) {
    return data.result.results.map(item => ({
      uid:    item.uid,
      name:   item.properties.name || item.properties.title,
      entity: resource
    }));
  }

  console.error("SWAPI returned unexpected shape:", data);
  return [];
}

/**
 * Trae un único ítem por UID.
 */
export async function getOne(resource, uid) {
  const data = await fetchJson(`${BASE}/${resource}/${uid}`);
  const item = data.result || data;
  return {
    uid,
    entity:     resource,
    name:       item.properties?.name || item.properties?.title || item.name,
    properties: item.properties || {}
  };
}