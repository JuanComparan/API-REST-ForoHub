package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.autor.Autor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicoRepository extends JpaRepository<Topico, Long> {
    Page<Topico> findByActivoTrue(Pageable paginacion);

    Page<Topico> findByAutorId(Long id, Pageable paginacion);

    Page<Topico> findByCursoId(Long id, Pageable paginacion);
}
