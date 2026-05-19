package com.innovatech.proyectos_service.model;

import com.innovatech.proyectos_service.enums.EstadoProyecto;
import com.innovatech.proyectos_service.enums.TipoProyecto;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "proyectos")
public class Proyecto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoProyecto tipo;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoProyecto estado = EstadoProyecto.PLANIFICACION;
    
    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;
    
    @Column(name = "fecha_fin_estimada")
    private LocalDateTime fechaFinEstimada;
    
    @Column(name = "fecha_fin_real")
    private LocalDateTime fechaFinReal;
    
    @Column(name = "porcentaje_avance")
    private Integer porcentajeAvance = 0;
    
    @Column(name = "presupuesto_asignado")
    private Double presupuestoAsignado;
    
    @Column(name = "responsable_id")
    private Long responsableId;
    
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Tarea> tareas = new ArrayList<>();
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    // ========== CONSTRUCTORES ==========
    
    public Proyecto() {}
    
    public Proyecto(String nombre, String descripcion, String role) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    
    // ========== GETTERS Y SETTERS MANUALES ==========
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public TipoProyecto getTipo() {
        return tipo;
    }
    
    public void setTipo(TipoProyecto tipo) {
        this.tipo = tipo;
    }
    
    public EstadoProyecto getEstado() {
        return estado;
    }
    
    public void setEstado(EstadoProyecto estado) {
        this.estado = estado;
    }
    
    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }
    
    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    
    public LocalDateTime getFechaFinEstimada() {
        return fechaFinEstimada;
    }
    
    public void setFechaFinEstimada(LocalDateTime fechaFinEstimada) {
        this.fechaFinEstimada = fechaFinEstimada;
    }
    
    public LocalDateTime getFechaFinReal() {
        return fechaFinReal;
    }
    
    public void setFechaFinReal(LocalDateTime fechaFinReal) {
        this.fechaFinReal = fechaFinReal;
    }
    
    public Integer getPorcentajeAvance() {
        return porcentajeAvance;
    }
    
    public void setPorcentajeAvance(Integer porcentajeAvance) {
        this.porcentajeAvance = porcentajeAvance;
    }
    
    public Double getPresupuestoAsignado() {
        return presupuestoAsignado;
    }
    
    public void setPresupuestoAsignado(Double presupuestoAsignado) {
        this.presupuestoAsignado = presupuestoAsignado;
    }
    
    public Long getResponsableId() {
        return responsableId;
    }
    
    public void setResponsableId(Long responsableId) {
        this.responsableId = responsableId;
    }
    
    public List<Tarea> getTareas() {
        return tareas;
    }
    
    public void setTareas(List<Tarea> tareas) {
        this.tareas = tareas;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}