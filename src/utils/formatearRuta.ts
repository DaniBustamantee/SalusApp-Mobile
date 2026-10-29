export function formatearRuta(distanciaKm: number, duracionMin: number){
    const total = Math.round(duracionMin);
    const horas = Math.floor(total/60);
    const minutos = total % 60;
    const duracion = horas > 0 ? `${horas} h ${minutos} min` : `${minutos} min`;

    return `${Math.round(distanciaKm)} km - ${duracion}`;
}