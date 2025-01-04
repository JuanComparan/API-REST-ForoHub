package com.monchito.forohub.controller;

import com.monchito.forohub.domain.topico.*;
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
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private TopicoService servicio;

    @PostMapping
    @Transactional
    public ResponseEntity registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico){
        var response = servicio.registrarTopico(datosRegistroTopico);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity <Page<DatosDetalleTopico>> listarTopicos(@PageableDefault(size = 10, sort = "fechaCreacion",
            direction = Sort.Direction.DESC) Pageable paginacion){
        return ResponseEntity.ok(topicoRepository.findByActivoTrue(paginacion).map(DatosDetalleTopico::new));
    }

    @GetMapping("/{id}")
    public ResponseEntity retornarDatosTopico(@PathVariable Long id){
        var response = servicio.obtenerTopico(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/autor/{id}")
    public ResponseEntity <Page<DatosDetalleTopico>> listarTopicosPorAutor(@PathVariable Long id, @PageableDefault(size = 4, sort = "fechaCreacion",
            direction = Sort.Direction.DESC) Pageable paginacion){
        var response =  servicio.obtenerTopicoPorAutor(id, paginacion);

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @Transactional
    public ResponseEntity actualizarTopico(@RequestBody @Valid DatosActualizarTopico datosActualizarTopico){
        var response = servicio.actualizarTopico(datosActualizarTopico);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarTopico(@PathVariable Long id){
        servicio.eliminarTopico(id);

        return ResponseEntity.noContent().build();
    }
}
