package com.innovatech.proyectos_service.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tareas")
public class Tarea {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(length = 1000)
    private String descripcion;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;
    
    @Column(name = "asignado_a")
    private Long asignadoA;
    
    @Column(nullable = false)
    private String estado = "PENDIENTE";
    
    @Column(name = "fecha_limite")
    private LocalDateTime fechaLimite;
    
    @Column(name = "fecha_completado")
    private LocalDateTime fechaCompletado;
    
    @Column(name = "horas_estimadas")
    private Integer horasEstimadas;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    // ========== CONSTRUCTORES ==========
    
    public Tarea() {}
    
    // ========== GETTERS Y SETTERS MANUALES ==========
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public Proyecto getProyecto() {
        return proyecto;
    }
    
    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }
    
    public Long getAsignadoA() {
        return asignadoA;
    }
    
    public void setAsignadoA(Long asignadoA) {
        this.asignadoA = asignadoA;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public LocalDateTime getFechaLimite() {
        return fechaLimite;
    }
    
    public void setFechaLimite(LocalDateTime fechaLimite) {
        this.fechaLimite = fechaLimite;
    }
    
    public LocalDateTime getFechaCompletado() {
        return fechaCompletado;
    }
    
    public void setFechaCompletado(LocalDateTime fechaCompletado) {
        this.fechaCompletado = fechaCompletado;
    }
    
    public Integer getHorasEstimadas() {
        return horasEstimadas;
    }
    
    public void setHorasEstimadas(Integer horasEstimadas) {
        this.horasEstimadas = horasEstimadas;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}