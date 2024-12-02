package com.monchito.forohub.domain.respuesta;

import com.monchito.forohub.domain.autor.Autor;
import com.monchito.forohub.domain.topico.Topico;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "respuestas")
@Entity(name = "Respuesta")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mensaje;
    @ManyToOne(fetch = FetchType.EAGER)
    private Topico topico;
    private LocalDateTime fechaCreacion;
    @ManyToOne(fetch = FetchType.EAGER)
    private Autor autor;
    @Enumerated(EnumType.STRING)
    private Solucion solucion;
    @ManyToMany(mappedBy = "respuestas", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Topico> topicos = new ArrayList<>();

    public Respuesta(String mensaje, Autor autor, Topico topico, Solucion solucion, LocalDateTime fechaCreacion) {
        this.mensaje = mensaje;
        this.autor = autor;
        this.topicos.add(topico);
        this.solucion = solucion;
        this.fechaCreacion = fechaCreacion;
    }

}
