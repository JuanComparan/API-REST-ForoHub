package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.curso.Curso;
import com.monchito.forohub.domain.respuesta.DatosDetalleRespuestaTopico;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record DatosDetalleTopico(
        Long id,
        String titulo,
        String mensaje,
        LocalDateTime fecha,
        Curso curso,
        String autor,
        List<DatosDetalleRespuestaTopico> respuestas
) {
    public DatosDetalleTopico(Topico topico){
        this(topico.getId(), topico.getTitulo(), topico.getMensaje(), topico.getFechaCreacion(),
                topico.getCurso(), topico.getAutor().getNombreDeUsuario(),
                topico.getRespuestas().stream().map(DatosDetalleRespuestaTopico::new).collect(Collectors.toList()));
    }
}
