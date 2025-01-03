package com.monchito.forohub.domain.autor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DatosRegistroAutor(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @NotBlank(message = "El correo electronico es obligatorio")
        @Email(message = "El correo electronico es invalido")
        String correoElectronico,
        @NotBlank(message = "La contraseña es obligatoria")
        String contrasena,
        @NotBlank(message = "La ocupacion es obligatoria")
        String ocupacion
) {
}
