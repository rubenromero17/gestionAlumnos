package com.example.backend.models;

import lombok.Getter;

@Getter
public enum EstadoProyecto {
    EN_CURSO("en curso"),
    FINALIZADO("finalizado"),
    PAUSADO("pausado");

    private final String valor;
    EstadoProyecto(String valor) { this.valor = valor; }

}