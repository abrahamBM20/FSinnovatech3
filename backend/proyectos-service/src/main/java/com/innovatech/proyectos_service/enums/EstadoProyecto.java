package com.innovatech.proyectos_service.enums;

public enum EstadoProyecto {
    PLANIFICACION("En planificación", 0),
    ACTIVO("Activo", 1),
    PAUSADO("Pausado", 2),
    COMPLETADO("Completado", 3),
    CANCELADO("Cancelado", 4);

    private final String descripcion;
    private final int orden;

    EstadoProyecto(String descripcion, int orden) {
        this.descripcion = descripcion;
        this.orden = orden;
    }

    public String getDescripcion() { return descripcion; }
    public int getOrden() { return orden; }
}