package com.monchito.forohub.domain.respuesta;

import java.time.LocalDateTime;

public record DatosDetalleRespuestaTopico(
        Long id,
        String mensaje,
        String autor,
        LocalDateTime fecha
) {
    public DatosDetalleRespuestaTopico(Respuesta respuesta) {
        this(respuesta.getId(), respuesta.getMensaje(),
                respuesta.getAutor().getNombreDeUsuario(),
                respuesta.getFechaCreacion());
    }
}
