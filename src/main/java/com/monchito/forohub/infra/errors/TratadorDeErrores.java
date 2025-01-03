package com.monchito.forohub.infra.errors;

import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ValidationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class TratadorDeErrores {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> tratadorError404() {
        return buildErrorResponse("Entidad no encontrada",
                List.of("El recurso solicitado no existe"),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> tratadorError400(MethodArgumentNotValidException ex) {
        var errores = ex.getFieldErrors().stream()
                .map(error -> String.format("%s: %s", error.getField(), error.getDefaultMessage()))
                .toList();
        return buildErrorResponse("Error de validacion", errores, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> errorDeDuplicado(DataIntegrityViolationException ex) {
        var error = "El mensaje o titulo debe ser unico";
        return buildErrorResponse("Violacion de integridad", List.of(error), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidacionDeIntegridad.class)
    public ResponseEntity<Map<String, Object>> errorHandlerValidacionDeIntegridad(ValidacionDeIntegridad ex) {
        return buildErrorResponse("Validacion de integridad", List.of(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String, Object>> errorHandlerValidacionDeNegocio(ValidationException e) {
        return buildErrorResponse("Error de negocio", List.of(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> errorGenerico(Exception ex) {
        return buildErrorResponse("Error interno", List.of(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String error, List<String> mensaje, HttpStatus status) {
        Map<String, Object> body = Map.of(
                "error", error,
                "mensaje", mensaje,
                "timestamp", Instant.now().toString());
        return ResponseEntity.status(status).body(body);
    }

    public record DatosErrorValidacion(String campo, String mensaje){
        public DatosErrorValidacion(FieldError error){
            this(error.getField(), error.getDefaultMessage());
        }
    }

}
