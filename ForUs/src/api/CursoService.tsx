import { ip } from "./IP";

export interface Curso {
    id: number,
    nombre: string,
    categoria: string
}

export const getCurso = async () => {
    try {
        const response = await fetch(
            `http://${ip}:8080/cursos`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
        );

        if (response.ok) {
            console.log("Se obtuvieron los cursos correctamente");
            return await response.json();
        } else {
            const errorData = await response.json();
            if (response.status === 409) {
                console.log("Error 409:", errorData);
            }
            console.log(errorData);
            throw new Error("Error al obtener los cursos");
        }
    } catch (error) {
        return [];
    }
}