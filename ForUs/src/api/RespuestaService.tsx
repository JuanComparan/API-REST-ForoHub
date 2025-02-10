import { ip } from "./IP";
export interface Respuesta {
    id: number;
    mensaje: string;
    autor: string;
    fecha: string;
};

export const addRespuesta = async (
    navigation: any,
    mensaje: string,
    id_topico: number,
    id_autor: number,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[]; time: string } | null>>
) => {
    const RespuestaDTO = {
        mensaje,
        id_topico,
        id_autor
    };

    // URL
    const url = `http://${ip}:8080/respuestas`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(RespuestaDTO),
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

            console.error("Error al crear la respuesta:", errorData);
            return;
        }

        const data = await response.json();
        console.log("Respuesta creada!!", data);

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

export const getRespuesta = async () => {
    
    // URL
    const url = `http://${ip}:8080/respuestas`;

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
            console.log("Se obtuvieron las respuestas correctamente");
            return await response.json();
        } else {
            const errorData = await response.json();
            if (response.status === 409) {
                console.log("Error 409:", errorData);
            }
            console.log(errorData);
            throw new Error("Error al obtener las respuestas");
        }
    } catch (error) {
        return [];
    }
};