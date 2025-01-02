import { ip } from "./IP";

export let autorError: any;

export const crearAutor = async (
    navigation: any,
    nombre: string,
    correoElectronico: string,
    contrasena: string,
    ocupacion: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {
    // DTO de autor
    const AutorDTO = {
        nombre,
        correoElectronico,
        contrasena,
        ocupacion
    };

    // URL
    const url = `http://${ip}:8080/usuario`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(AutorDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorTitle = errorData.title || "Error";

            // Procesar los errores en caso de que sean un arreglo de objetos
            let errorMessages;
            if (Array.isArray(errorData)) {
                errorMessages = errorData.map(
                    (error) =>
                        `${error.campo || "Campo desconocido"}: ${error.mensaje || "Error desconocido"}`
                );
            } else if (Array.isArray(errorData.errorMessages)) {
                errorMessages = errorData.errorMessages;
            } else {
                errorMessages = [errorData.errorMessages || "Error desconocido"];
            }

            if (setError) {
                setError({ title: errorTitle, errorMessages });
            }
            
            console.error("Error al crear el usuario:", errorData);
            return;
        }

        const data = await response.json();
        console.log("Usuario creado!!", data);

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("Welcome");
    } catch (error) {
        console.error("Error de red:", error);
        if (setError) {
            setError({
                title: "Error de red",
                errorMessages: ["No se pudo conectar al servidor"],
            });
        }
    }
}