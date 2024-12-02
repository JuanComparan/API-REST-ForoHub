package com.monchito.forohub.controller;

import com.monchito.forohub.domain.respuesta.DatosDetalleRespuesta;
import com.monchito.forohub.domain.respuesta.DatosRegistroRespuesta;
import com.monchito.forohub.domain.respuesta.RespuestaRepository;
import com.monchito.forohub.domain.respuesta.RespuestaService;
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
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {

    @Autowired
    private RespuestaService servicio;

    @Autowired
    private RespuestaRepository respuestaRepository;

    @PostMapping
    @Transactional
    public ResponseEntity registrarRespuesta(@RequestBody @Valid DatosRegistroRespuesta datosRegistrorespuesta, UriComponentsBuilder uriComponentsBuilder) {
        var response = servicio.registrarRespuesta(datosRegistrorespuesta);
        URI url = uriComponentsBuilder.path("/respuestas/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(url).body(response);
    }

    @GetMapping
    public ResponseEntity <Page<DatosDetalleRespuesta>> listarRespuestas(@PageableDefault(size = 4, sort = "fechaCreacion",
            direction = Sort.Direction.DESC) Pageable paginacion){
        return ResponseEntity.ok(respuestaRepository.findAll(paginacion).map(DatosDetalleRespuesta::new));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarRespuesta(@PathVariable Long id){
        servicio.eliminarRespuesta(id);

        return ResponseEntity.noContent().build();
    }
}
