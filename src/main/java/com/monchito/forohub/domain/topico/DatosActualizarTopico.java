package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.curso.Curso;
import com.monchito.forohub.domain.respuesta.Solucion;
import jakarta.validation.constraints.NotNull;

public record DatosActualizarTopico(
        @NotNull
        Long IdTopico,
        String titulo,
        String mensaje,
        Solucion solucion
) {
}
