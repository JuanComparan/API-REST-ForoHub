import { ip } from "./IP";
import { getUserId, saveUserId } from "./AsyncStorageService";

export interface Autor {
    id: number,
    nombre: string,
    ocupacion: string
}

export const iniciarSesion = async (
    navigation: any,
    correoElectronico: string,
    contrasena: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[]; time: string } | null>>
) => {
    // DTO de iniciar Sesion
    const LoginDTO = {
        correo_electronico: correoElectronico,
        contrasena
    }

    // URL
    const url = `http://${ip}:8080/login`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(LoginDTO),
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

            console.error("Error al iniciar sesion:", errorData);
            return;
        }

        const data = await response.json();

        // Guardamos el ID globalmente
        console.log("ID del usuario iniciado: ", data.id)

        await saveUserId("UserId", data.id);
        const myId = await getUserId("UserId")
        console.log("ID guardada: ", myId);

        console.log("Sesion Iniciada!!", data);

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

export const crearAutor = async (
    navigation: any,
    nombre: string,
    correoElectronico: string,
    contrasena: string,
    ocupacion: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[]; time: string } | null>>
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
                time: new Date().toISOString()
            });
        }
    }
}

export const getAutor = async (id: number) => {
    // URL
    const url = `http://${ip}:8080/usuario/${id}`;

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
            console.log("Se obtuvo el usuario correctamente");
            return await response.json();
        } else {
            const errorData = await response.json();
            if (response.status === 409) {
                console.log("Error 409:", errorData);
            }
            console.log(errorData);
            throw new Error("Error al obtener el usuario");
        }
    } catch (error) {
        return [];
    }
}