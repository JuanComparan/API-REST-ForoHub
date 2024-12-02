package com.monchito.forohub.domain.respuesta;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroRespuesta(
        @NotBlank(message = "{mensaje obligatorio}")
        String mensaje,
        @NotNull(message = "{usuario obligatorio}")
        Long IdAutor,
        @NotNull(message = "{topico obligatorio}")
        Long IdTopico,
        @NotNull(message = "{solucion_obligatorio}")
        Solucion solucion
) {
}
