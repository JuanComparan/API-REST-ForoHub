package com.monchito.forohub.controller;

import com.monchito.forohub.domain.curso.CursoRepository;
import com.monchito.forohub.domain.curso.CursoService;
import com.monchito.forohub.domain.curso.DatosDetalleCurso;
import com.monchito.forohub.domain.curso.DatosRegistroCurso;
import com.monchito.forohub.domain.topico.DatosDetalleTopico;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    @Autowired
    private CursoService servicio;
    @Autowired
    private CursoRepository cursoRepository;

    @PostMapping
    @Transactional
    public ResponseEntity registrarCurso(@RequestBody @Valid DatosRegistroCurso datosRegistroCurso) {
        var response = servicio.registrarCurso(datosRegistroCurso);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity <Page<DatosDetalleCurso>> listarCursos(@PageableDefault(size = 4, sort = "Categoria",
            direction = Sort.Direction.DESC) Pageable paginacion){
        return ResponseEntity.ok(cursoRepository.findByActivoTrue(paginacion).map(DatosDetalleCurso::new));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarCurso(@PathVariable Long id){
        servicio.eliminarCurso(id);

        return ResponseEntity.noContent().build();
    }
}
