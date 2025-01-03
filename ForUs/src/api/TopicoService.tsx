import { ip } from "./IP";
import { Respuesta } from "./RespuestaService";

export interface Topico {
    id: number;
    titulo: string;
    mensaje: string;
    fecha: string;
    curso: string;
    autor: string;
    solucion: string;
    listaRespuestas: Respuesta[];
}

export const getTopico = async () => {
    try {
        const response = await fetch(
            `http://${ip}:8080/topicos`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
        );

        if (response.ok) {
            console.log("Se obtuvieron los topicos correctamente");
            return await response.json();
        } else {
            const errorData = await response.json();
            if (response.status === 409) {
                console.log("Error 409:", errorData);
            }
            console.log(errorData);
            throw new Error("Error al obtener los topicos");
        }
    } catch (error) {
        return [];
    }

};