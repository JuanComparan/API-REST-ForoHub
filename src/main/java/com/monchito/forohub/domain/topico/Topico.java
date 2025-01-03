package com.monchito.forohub.domain.topico;

import com.monchito.forohub.domain.autor.Autor;
import com.monchito.forohub.domain.curso.Curso;
import com.monchito.forohub.domain.respuesta.Respuesta;
import com.monchito.forohub.domain.respuesta.Solucion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne(fetch = FetchType.EAGER)
    private Autor autor;

    @ManyToOne(fetch = FetchType.EAGER)
    private Curso curso;

    @Enumerated(EnumType.STRING)
    private Solucion solucion;

    @ManyToMany
    @JoinTable(
            name = "topico_respuesta",
            joinColumns = @JoinColumn(name = "topico_id"),
            inverseJoinColumns = @JoinColumn(name = "respuesta_id")
    )
    private List<Respuesta> respuestas = new ArrayList<>();

    public Topico(String titulo, String mensaje, Autor autor, LocalDateTime fechaCreacion, Curso curso, Solucion solucion) {
        this.activo = true;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.autor = autor;
        this.fechaCreacion = fechaCreacion;
        this.curso = curso;
        this.solucion = solucion;
    }

    public void actualizarTopico(DatosActualizarTopico datos) {
            if (datos.titulo() != null) {
                this.titulo = datos.titulo();
            }
            if (datos.mensaje() != null) {
                this.mensaje = datos.mensaje();
            }
            if (datos.solucion() != null) {
                this.solucion = datos.solucion();
            }
    }

    public void agregarRespuesta(Respuesta respuesta) {
        this.respuestas.add(respuesta);
    }
}
