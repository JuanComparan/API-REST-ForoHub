package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.autor.AutorRepository;
import com.monchito.forohub.domain.curso.CursoRepository;
import com.monchito.forohub.infra.errors.ValidacionDeIntegridad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TopicoService {

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private TopicoRepository topicoRepository;

    public DatosDetalleTopico registrarTopico(DatosRegistroTopico datos) {
        if(!autorRepository.findById(datos.IdAutor()).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el autor no fue encontrado");
        }

        if(!cursoRepository.findById(datos.IdCurso()).isPresent()){
            throw new ValidacionDeIntegridad("Este id para curso no fue encontrado");
        }

        var autor = autorRepository.findById(datos.IdAutor()).get();
        var curso = cursoRepository.findById(datos.IdCurso()).get();
        var fechaCreacion = LocalDateTime.now();
        var topico = new Topico(datos.titulo(), datos.mensaje(), autor, fechaCreacion, curso);

        topicoRepository.save(topico);

        return new DatosDetalleTopico(topico);
    }


    public DatosDetalleTopico actualizarTopico(DatosActualizarTopico datos) {
        if(!topicoRepository.findById(datos.IdTopico()).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el topico no fue encontrado");
        }

        var topico = topicoRepository.findById(datos.IdTopico()).get();

        topico.actualizarTopico(datos);

        return new DatosDetalleTopico(topico);
    }

    public DatosDetalleTopico obtenerTopico(Long id) {
        if(!topicoRepository.findById(id).isPresent()){
            throw  new ValidacionDeIntegridad("Este id para el topico no fue encontrado");
        }

        var topico = topicoRepository.findById(id).get();

        return new DatosDetalleTopico(topico);
    }

    public void eliminarTopico(Long id) {
        if(!topicoRepository.findById(id).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el topico no fue encontrado");
        }

        topicoRepository.deleteById(id);
    }
}
