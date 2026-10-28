import type { Coordenadas } from "@/constants/ciudades";


export type Parada = {
    id: number;
    numero: number;
    lat: number;
    lng: number;
    titulo: string;
    detalle: string;
};

type Colores = {
    colorParada: string;
    colorDeposito: string;
};

export function construirHtmlMapa(
    paradas: Parada[],
    deposito: Coordenadas & { nombre: string },
    { colorParada, colorDeposito }: Colores
) {
    const datos = JSON.stringify({ paradas, deposito }).replace(/</g, "\\u003c");

    return `<!DOCTYPE html>
    <html>
    <head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #mapa { height: 100%; margin: 0; }
  .marcador {
    width: 28px; height: 28px; border-radius: 50%;
    border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font: bold 12px sans-serif;
  }
  .marcador.parada { background: ${colorParada}; }
  .marcador.deposito { background: ${colorDeposito}; border-radius: 6px; font-size: 14px; }
</style>
</head>
<body>
<div id="mapa"></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  var datos = ${datos};

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function icono(clase, contenido) {
    return L.divIcon({
      html: '<div class="marcador ' + clase + '">' + contenido + '</div>',
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }

  var mapa = L.map("mapa");
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapa);

  var puntos = [[datos.deposito.lat, datos.deposito.lng]];

  L.marker([datos.deposito.lat, datos.deposito.lng], { icon: icono("deposito", "&#127981;") })
    .addTo(mapa)
    .bindPopup("<strong>" + esc(datos.deposito.nombre) + "</strong><br>Punto de partida");

  datos.paradas.forEach(function (p) {
    puntos.push([p.lat, p.lng]);
    L.marker([p.lat, p.lng], { icon: icono("parada", p.numero) })
      .addTo(mapa)
      .bindPopup("<strong>" + esc(p.titulo) + "</strong><br>" + esc(p.detalle));
  });

  var yo = null;
  var encuadreAutomatico = true;

  window.mostrarMiPosicion = function (lat, lng) {
  if (yo) {
  yo.setLatLng([lat, lng]);
  } else {
    yo = L.circleMarker([lat, lng], {
radius: 9, color: "#fff", weight: 3, fillColor: "#3b82f6", fillOpacity: 1
}).addTo(mapa).bindPopup("Tu ubicaci&oacute;n");
}
encuadreAutomatico = false;
mapa.setView([lat, lng], 14);
};

  function encuadrar() {
    mapa.invalidateSize();
    if(encuadreAutomatico){
    mapa.fitBounds(puntos, { padding: [40, 40], maxZoom: 13 });
  }
}

mapa.getContainer().addEventListener("pointerdown", function () {
encuadreAutomatico = false;
});
  encuadrar();
  new ResizeObserver(encuadrar).observe(document.getElementById("mapa"));
</script>
</body>
</html>`;
}