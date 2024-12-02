CREATE TABLE cursos (
                         id SERIAL PRIMARY KEY,
                         nombre VARCHAR(255) NOT NULL,
                         categoria VARCHAR(255) NOT NULL
);

ALTER TABLE topicos
ADD COLUMN curso_id BIGINT,
ADD CONSTRAINT fk_curso
FOREIGN KEY (curso_id)
REFERENCES cursos(id);
