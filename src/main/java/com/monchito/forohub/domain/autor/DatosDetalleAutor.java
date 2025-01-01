package com.monchito.forohub.domain.autor;

public record DatosDetalleAutor(
        Long id,
        String nombre,
        String correoElectronico,
        String ocupacion
) {
    public DatosDetalleAutor(Autor autor) {
        this(autor.getId(), autor.getUsername(), autor.getCorreoElectronico(), autor.getOcupacion());
    }
}
