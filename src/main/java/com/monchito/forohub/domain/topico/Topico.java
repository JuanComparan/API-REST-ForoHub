package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.autor.Autor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "topicos")
@Entity(name = "Topico")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Topico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String mensaje;
    private LocalDateTime fechaCreacion;
    private boolean activo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Autor autor;

    @Enumerated(EnumType.STRING)
    private Curso curso;

    public Topico(String titulo, String mensaje, Autor autor, LocalDateTime fechaCreacion, Curso curso) {
        this.activo = true;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.autor = autor;
        this.fechaCreacion = fechaCreacion;
        this.curso = curso;
    }

    public void actualizarTopico(DatosActualizarTopico datos) {
            if (datos.titulo() != null) {
                this.titulo = datos.titulo();
            }
            if (datos.mensaje() != null) {
                this.mensaje = datos.mensaje();
            }
            if (datos.curso() != null) {
                this.curso = datos.curso();
            }
    }
}
