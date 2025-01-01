package com.monchito.forohub.domain.autor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public DatosDetalleAutor registrarAutor(DatosRegistroAutor datos){
        var autor = new Autor(datos.nombre(), datos.correoElectronico(), datos.contrasena(),
                datos.ocupacion());

        autorRepository.save(autor);

        return new DatosDetalleAutor(autor);
    }
}
