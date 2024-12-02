CREATE TABLE respuestas (
                            id SERIAL PRIMARY KEY,
                            mensaje TEXT NOT NULL,
                            fecha_creacion TIMESTAMP NOT NULL,
                            autor_id BIGINT,
                            topico_id BIGINT,
                            solucion VARCHAR(255),
                            CONSTRAINT fk_autor
                                FOREIGN KEY (autor_id)
                                    REFERENCES autores(id),
                            CONSTRAINT fk_topico
                                FOREIGN KEY (topico_id)
                                    REFERENCES topicos(id)
);

