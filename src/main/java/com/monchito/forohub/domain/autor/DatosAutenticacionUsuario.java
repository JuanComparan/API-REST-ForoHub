package com.monchito.forohub.domain.autor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DatosAutenticacionUsuario(
        @NotBlank(message = "El correo electronico es obligatorio")
        @Email(message = "El correo electronico debe ser válido")
        String correo_electronico,
        @NotBlank(message = "La contraseña es obligatoria")
        String contrasena)
{
}
