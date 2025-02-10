package com.monchito.forohub.controller;

import com.monchito.forohub.domain.autor.Autor;
import com.monchito.forohub.domain.autor.AutorRepository;
import com.monchito.forohub.domain.autor.AutorService;
import com.monchito.forohub.domain.autor.DatosRegistroAutor;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private AutorService service;

    @PostMapping
    @Transactional
    public ResponseEntity registraAutor(@RequestBody @Valid DatosRegistroAutor datosRegistroAutor,
                                        UriComponentsBuilder uriComponentsBuilder) {
        var response = service.registrarAutor(datosRegistroAutor);
        URI url = uriComponentsBuilder.path("/usuario/{id}").buildAndExpand(response.id()).toUri();
        return ResponseEntity.created(url).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity retornarDatosAutor(@PathVariable Long id){
        var response = service.obtenerTopico(id);

        return ResponseEntity.ok(response);
    }
}
