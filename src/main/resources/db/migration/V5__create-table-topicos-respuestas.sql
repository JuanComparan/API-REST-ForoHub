CREATE TABLE topico_respuesta (
                                  topico_id BIGINT NOT NULL,
                                  respuesta_id BIGINT NOT NULL,
                                  PRIMARY KEY (topico_id, respuesta_id),
                                  FOREIGN KEY (topico_id) REFERENCES topicos(id),
                                  FOREIGN KEY (respuesta_id) REFERENCES respuestas(id)
);


