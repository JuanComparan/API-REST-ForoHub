package com.monchito.forohub.domain.respuesta;

import com.monchito.forohub.domain.autor.AutorRepository;
import com.monchito.forohub.domain.topico.Topico;
import com.monchito.forohub.domain.topico.TopicoRepository;
import com.monchito.forohub.infra.errors.ValidacionDeIntegridad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RespuestaService {

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private RespuestaRepository respuestaRepository;

    public DatosDetalleRespuesta registrarRespuesta(DatosRegistroRespuesta datos) {
        if(!autorRepository.findById(datos.IdAutor()).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el autor no fue encontrado");
        }
        if(!topicoRepository.findById(datos.IdTopico()).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el topico no fue encontrado");
        }

        var autor = autorRepository.findById(datos.IdAutor()).get();
        var topico = topicoRepository.findById(datos.IdTopico()).get();
        var fechaCreacion = LocalDateTime.now();
        var respuesta = new Respuesta(datos.mensaje(), autor, topico, datos.solucion(), fechaCreacion);
        topico.agregarRespuesta(respuesta);

        respuestaRepository.save(respuesta);

        return new DatosDetalleRespuesta(respuesta);
    }

    public void eliminarRespuesta(Long id) {
        if(!respuestaRepository.findById(id).isPresent()){
            throw new ValidacionDeIntegridad("Este id para la respuesta no fue encontrado");
        }

        var respuesta = respuestaRepository.findById(id).get();

        // Eliminar las asociaciones con topicos
        respuesta.getTopicos().clear(); // Esto desasocia todos los topicos de la respuesta

        respuestaRepository.save(respuesta);

        // Ahora eliminamos la respuesta
        respuestaRepository.deleteById(id);
    }
}
