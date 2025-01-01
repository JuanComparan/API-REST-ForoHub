package com.monchito.forohub.domain.autor;

import jakarta.validation.constraints.NotBlank;

public record DatosRegistroAutor(
        @NotBlank(message = "{nombre_obligatorio}")
        String nombre,
        @NotBlank(message = "{correoElectronico_obligatorio}")
        String correoElectronico,
        @NotBlank(message = "{contrasena_obligatoria}")
        String contrasena,
        @NotBlank(message = "{ocupacion_obligatoria}")
        String ocupacion
) {
}
