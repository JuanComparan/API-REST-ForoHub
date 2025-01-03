package com.monchito.forohub.domain.respuesta;

import com.monchito.forohub.domain.topico.DatosDetalleTopico;
import com.monchito.forohub.domain.topico.DatosDetalleTopicoRespuesta;
import com.monchito.forohub.domain.topico.Topico;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record DatosDetalleRespuesta(
        Long id,
        String mensaje,
        String autor,
        List<DatosDetalleTopicoRespuesta> topico,
        LocalDateTime fecha
) {

    public DatosDetalleRespuesta(Respuesta respuesta) {
        this(respuesta.getId(), respuesta.getMensaje(), respuesta.getAutor().getNombreDeUsuario(),
                respuesta.getTopicos().stream().map(DatosDetalleTopicoRespuesta::new).collect(Collectors.toList()),
                respuesta.getFechaCreacion());
    }
}
