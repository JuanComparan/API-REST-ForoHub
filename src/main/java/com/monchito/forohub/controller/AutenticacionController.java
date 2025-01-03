package com.monchito.forohub.controller;

import com.monchito.forohub.domain.autor.Autor;
import com.monchito.forohub.domain.autor.AutorService;
import com.monchito.forohub.domain.autor.DatosAutenticacionUsuario;
import com.monchito.forohub.infra.security.AutenticacionService;
import com.monchito.forohub.infra.security.DatosJWTtoken;
import com.monchito.forohub.infra.security.TokenService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AutenticacionController {

    @Autowired
    private AutorService autorService;

    @PostMapping
    @Transactional
    public ResponseEntity loginRequest(@RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario) {
        var response = autorService.loginRequest(datosAutenticacionUsuario);

        // Regresamos un 200 si esta ok
        return ResponseEntity.ok(response);
    }

//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private TokenService tokenService;
//
//    @PostMapping
//    @Transactional
//    public ResponseEntity autenticarUsuario(@RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario) {
//        Authentication authToken = new UsernamePasswordAuthenticationToken(datosAutenticacionUsuario.nombreDeUsuario(),
//                datosAutenticacionUsuario.contrasena());
//        var usuarioAutenticado = authenticationManager.authenticate(authToken);
//        var JWTtoken = tokenService.generarToken((Autor) usuarioAutenticado.getPrincipal());
//        return ResponseEntity.ok(new DatosJWTtoken(JWTtoken));
//    }
}
