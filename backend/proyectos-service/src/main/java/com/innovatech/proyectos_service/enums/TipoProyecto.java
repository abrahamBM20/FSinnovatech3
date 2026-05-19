package com.innovatech.proyectos_service.enums;

public enum TipoProyecto {
    AGIL("Ágil", "Metodología Scrum/Kanban - Entregas iterativas"),
    TRADICIONAL("Tradicional", "Metodología Waterfall - Fases secuenciales"),
    HIBRIDO("Híbrido", "Combinación de metodologías ágiles y tradicionales");

    private final String nombre;
    private final String descripcion;

    TipoProyecto(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    public String getNombre() { return nombre; }
    public String getDescripcion() { return descripcion; }
}