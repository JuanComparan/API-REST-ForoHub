package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.curso.Curso;
import jakarta.validation.constraints.NotNull;

public record DatosActualizarTopico(@NotNull Long IdTopico, String titulo, String mensaje, Curso curso) {
}
