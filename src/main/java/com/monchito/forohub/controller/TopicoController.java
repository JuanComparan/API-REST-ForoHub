package com.monchito.forohub.controller;

import com.monchito.forohub.domain.topico.DatosRegistroTopico;
import com.monchito.forohub.domain.topico.TopicoRepository;
import com.monchito.forohub.domain.topico.TopicoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private TopicoService servicio;

    @PostMapping
    public ResponseEntity registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico){
        var response = servicio.registrarTopico(datosRegistroTopico);

        return ResponseEntity.ok(response);
    }
}
