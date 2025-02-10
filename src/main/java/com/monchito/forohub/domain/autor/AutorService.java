package com.monchito.forohub.domain.autor;

import com.monchito.forohub.infra.errors.ValidacionDeIntegridad;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public DatosDetalleAutor loginRequest(DatosAutenticacionUsuario datos) {
        Optional<Autor> autor = autorRepository.findByCorreoElectronico(datos.correo_electronico());

        if(autor.isEmpty()){
            throw new ValidacionDeIntegridad("Este correo no es correcto");
        }

        else if(!autor.get().getContrasena().equals(datos.contrasena())){
            throw new ValidacionDeIntegridad("La contraseña no es correcta");
        }

        return new DatosDetalleAutor(autor.get());
    }

    public DatosDetalleAutor obtenerTopico(Long id) {
        if (!autorRepository.existsById(id)) {
            throw new ValidacionDeIntegridad("No existe el id del autor");
        }

        var autor = autorRepository.findById(id).get();

        return new DatosDetalleAutor(autor);
    }
}
