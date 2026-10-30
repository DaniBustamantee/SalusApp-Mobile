import type { Parada } from "@/utils/construirHtmlMapa";
import { calcularRuta } from "./rutas";

const deposito = {lat: -31.385, lng: -64.235};

const paradas: Parada[] = [
    {id:11, numero:1, lat:-31.4, lng:-64.2, titulo:"A", detalle:"a",},
    {id:22, numero:2, lat:-32.9, lng:-60.6, titulo:"B", detalle:"b",},
    {id:33, numero:3, lat:-34.9, lng:-57.9, titulo:"C", detalle:"c",},
];


function respuestaOk(indices: number[], code = "Ok"){
    return{
        ok: true,
        json: async () => ({
            code,
            waypoints: indices.map((waypoint_index) => ({waypoint_index})),
            trips: [{
                distance: 300000,
                duration: 7200,
                geometry: {coordinates: [[-64.235, -31.385], [-60.6, -32.9]] },
            }],
        }),
    };
}


const fetchFalso = jest.fn();

beforeEach(() => {
    fetchFalso.mockReset();
    globalThis.fetch = fetchFalso as unknown as typeof fetch;
});

describe("calcularRuta", () => {
    it("pide la ruta con longitud, latitud empezando por el deposito", async () => {
        fetchFalso.mockResolvedValue(respuestaOk([0,1,2,3]));
        await calcularRuta(paradas, deposito);

        const url = fetchFalso.mock.calls[0][0] as string;

        expect(url).toContain("/trip/v1/driving/-64.235,-31.385;-64.2,-31.4;-60.6,-32.9;-57.9,-34.9");
        expect(url).toContain("source=first");
        expect(url).toContain("roundtrip=false");
    });

    it("reordenar las paradas segun wayponits_index y las renumera", async () => {
        fetchFalso.mockResolvedValue(respuestaOk([0,2,1,3]));
        const ruta = await calcularRuta(paradas, deposito);

        expect(ruta.paradas.map((p) => p.id)).toEqual([22,11,33]);
        expect(ruta.paradas.map((p) => p.numero)).toEqual([1,2,3]);
    });

    it("da vuelta las coordenadas del trazado a latitud, longitud" , async () => {
        fetchFalso.mockResolvedValue(respuestaOk([0,1,2,3]));
        const ruta = await calcularRuta(paradas, deposito);

        expect(ruta.trazado).toEqual([[-31.385, -64.235], [-32.9, -60.6]]);
    });

    it("convierte la distancia a km y la duracion a minutos", async () => {
        fetchFalso.mockResolvedValue(respuestaOk([0,1,2,3]));
        const ruta = await calcularRuta(paradas, deposito);

        expect(ruta.distanciaKm).toBe(300);
        expect(ruta.duracionMin).toBe(120);
    });

    it.each([
        ["no hay red", () => fetchFalso.mockRejectedValue(new TypeError("Network request failed"))],
        ["el servidor contesta error", () => fetchFalso.mockResolvedValue({
            ...respuestaOk([0,1,2,3]), ok: false })],
            ["OSRM no encuentra ruta", () => fetchFalso.mockResolvedValue(respuestaOk([0,1,2,3], "NoRoute"))],
            ["la respuesta no es JSON", () => fetchFalso.mockResolvedValue({ok: true,
                json: async () => {throw new SyntaxError("x");}})],
    ])("falla con un mensaje claro cuando %s", async (_caso, preparar) =>{
        preparar();
        await expect(calcularRuta(paradas, deposito)).rejects.toThrow("No se pudo calcular la ruta");
    });
});