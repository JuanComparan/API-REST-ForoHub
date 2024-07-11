CREATE TABLE autores (
                         id SERIAL PRIMARY KEY,
                         nombre_de_usuario VARCHAR(255) NOT NULL,
                         correo_electronico VARCHAR(255) NOT NULL,
                         contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE topicos (
                         id SERIAL PRIMARY KEY,
                         titulo VARCHAR(255) NOT NULL,
                         mensaje TEXT NOT NULL,
                         fecha_creacion TIMESTAMP NOT NULL,
                         activo BOOLEAN NOT NULL,
                         autor_id BIGINT,
                         CONSTRAINT fk_autor
                             FOREIGN KEY (autor_id)
                                 REFERENCES autores(id)
);

CREATE TABLE respuestas (
                            id SERIAL PRIMARY KEY,
                            mensaje TEXT NOT NULL,
                            topico_id BIGINT,
                            fecha_de_creacion TIMESTAMP NOT NULL,
                            autor_id BIGINT,
                            CONSTRAINT fk_topico
                                FOREIGN KEY (topico_id)
                                    REFERENCES topicos(id),
                            CONSTRAINT fk_autor_respuesta
                                FOREIGN KEY (autor_id)
                                    REFERENCES autores(id)
);
