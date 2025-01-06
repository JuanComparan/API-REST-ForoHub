import { ip } from "./IP";
import { Respuesta } from "./RespuestaService";

export interface Topico {
    id: number;
    titulo: string;
    mensaje: string;
    fecha: string;
    curso: string;
    autor: string;
    autorOcupacion: string;
    solucion: string;
    listaRespuestas: Respuesta[];
}

export const getTopico = async (bandera, idCurso) => {
    // Definir la URL base dependiendo de la bandera
    const url = bandera
        ? `http://${ip}:8080/topicos/curso/${idCurso}`
        : `http://${ip}:8080/topicos`;

    try {
        const response = await fetch(
            url, {
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

export const addTopico = async (
    navigation: any,
    titulo: string,
    mensaje: string,
    IdAutor: number,
    IdCurso: number,
    solucion: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[]; time: string } | null>>
) => {
    // Creamos el DTO del topico
    const TopicoDTO = {
        titulo,
        mensaje,
        IdAutor,
        IdCurso,
        solucion
    };

    // URL
    const url = `http://${ip}:8080/topicos`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(TopicoDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorTitle = errorData.error || "Error";
            const errorTime = errorData.timestamp || new Date().toISOString();

            // Procesar los errores 
            let errorMessages = Array.isArray(errorData.mensaje) ? errorData.mensaje : ["Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: errorTitle,
                    errorMessages,
                    time: errorTime
                });
            }

            console.error("Error al crear el topico:", errorData);
            return;
        }

        const data = await response.json();
        console.log("Topico creado!!", data);

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("Home");
    } catch (error) {
        console.error("Error de red:", error);
        if (setError) {
            setError({
                title: "Error de red",
                errorMessages: ["No se pudo conectar al servidor"],
                time: new Date().toISOString()
            });
        }
    }
}