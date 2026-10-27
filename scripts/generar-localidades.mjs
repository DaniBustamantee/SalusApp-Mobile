import { mkdirSync, writeFileSync } from "node:fs";

const URL = "https://apis.datos.gob.ar/georef/api/localidades?max=5000&campos=nombre,provincia.nombre,centroide";


const respuesta = await fetch(URL);
if (!respuesta.ok) {
    throw new Error(`Georef respondio con el estado ${respuesta.status}`);
}

const { localidades } = await respuesta.json();

const resultado = {};
for (const loc of localidades) {
    const provincia = loc.provincia.nombre;
    resultado[provincia] ??= {};
    resultado[provincia][loc.nombre] = [
        Number(loc.centroide.lat.toFixed(4)),
        Number(loc.centroide.lon.toFixed(4)),
    ];
}

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/localidades.json", JSON.stringify(resultado));

console.log(`Listo: ${localidades.length} localidades en ${Object.keys(resultado).length} provincias`);