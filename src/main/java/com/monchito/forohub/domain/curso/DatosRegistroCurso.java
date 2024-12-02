package com.monchito.forohub.domain.curso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroCurso(
        @NotBlank(message = "{nombre obligatorio}")
        String nombre,
        @NotNull(message = "{categoria obligatorio}")
        Categoria categoria
) {
}
