package com.monchito.forohub.domain.curso;

import com.monchito.forohub.infra.errors.ValidacionDeIntegridad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public DatosDetalleCurso registrarCurso(DatosRegistroCurso datos){
        var curso = new Curso(datos.nombre(), datos.categoria());
        cursoRepository.save(curso);
        return new DatosDetalleCurso(curso);
    }


    public void eliminarCurso(Long id) {
        if(!cursoRepository.findById(id).isPresent()){
            throw new ValidacionDeIntegridad("Este id para el curso no fue encontrado");
        }

        cursoRepository.deleteById(id);
    }
}
