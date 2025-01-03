package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.curso.Curso;
import com.monchito.forohub.domain.respuesta.Solucion;

import java.time.LocalDateTime;

public record DatosDetalleTopicoRespuesta(
        Long id,
        String titulo,
        String mensaje,
        LocalDateTime fecha,
        String autor,
        Curso curso,
        Solucion solucion
) {
    public DatosDetalleTopicoRespuesta(Topico topico) {
        this(topico.getId(), topico.getTitulo(), topico.getMensaje(),
                topico.getFechaCreacion(), topico.getAutor().getNombreDeUsuario(),
                topico.getCurso(), topico.getSolucion());
    }
}
