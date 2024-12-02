CREATE TABLE autores (
                         id SERIAL PRIMARY KEY,
                         nombre_de_usuario VARCHAR(255) NOT NULL,
                         correo_electronico VARCHAR(255) NOT NULL,
                         contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE topicos (
                         id SERIAL PRIMARY KEY,
                         titulo VARCHAR(255) NOT NULL UNIQUE ,
                         mensaje TEXT NOT NULL UNIQUE ,
                         fecha_creacion TIMESTAMP NOT NULL,
                         activo BOOLEAN NOT NULL,
                         autor_id BIGINT,
                         curso VARCHAR(255),  -- curso como campo de texto
                         CONSTRAINT fk_autor
                             FOREIGN KEY (autor_id)
                                 REFERENCES autores(id)
);
