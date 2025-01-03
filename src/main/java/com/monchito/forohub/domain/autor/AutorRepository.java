package com.monchito.forohub.domain.autor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface AutorRepository extends JpaRepository<Autor, Long> {
    UserDetails findByNombreDeUsuario(String userName);

    Optional<Autor> findByCorreoElectronico(String correoElectronico);

    Boolean existsByCorreoElectronico(String correo);
}
