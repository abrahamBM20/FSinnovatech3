package com.innovatech.proyectos_service.service;

import com.innovatech.proyectos_service.dto.*;
import com.innovatech.proyectos_service.enums.EstadoProyecto;
import com.innovatech.proyectos_service.factory.ProyectoFactory;
import com.innovatech.proyectos_service.model.Proyecto;
import com.innovatech.proyectos_service.model.Tarea;
import com.innovatech.proyectos_service.repository.ProyectoRepository;
import com.innovatech.proyectos_service.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;
    
    @Autowired
    private TareaRepository tareaRepository;
    
    @Autowired
    private ProyectoFactory proyectoFactory;  // Uso del Factory Method

    // ========== Proyectos ==========
    
    @Transactional
    public ProyectoDTO crearProyecto(CreateProyectoRequest request) {
        Proyecto proyecto;
        
        // Uso del PATRÓN FACTORY METHOD
        if (request.presupuestoAsignado() != null) {
            proyecto = proyectoFactory.crearProyectoConPresupuesto(
                request.nombre(),
                request.descripcion(),
                request.tipo(),
                request.responsableId(),
                request.presupuestoAsignado()
            );
        } else {
            proyecto = proyectoFactory.crearProyecto(
                request.nombre(),
                request.descripcion(),
                request.tipo(),
                request.responsableId()
            );
        }
        
        Proyecto saved = proyectoRepository.save(proyecto);
        return convertToDTO(saved);
    }
    
    public List<ProyectoDTO> listarProyectos() {
        return proyectoRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProyectoDTO obtenerProyecto(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        return convertToDTO(proyecto);
    }
    
    public List<ProyectoDTO> listarPorResponsable(Long responsableId) {
        return proyectoRepository.findByResponsableId(responsableId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ProyectoDTO actualizarAvance(Long id, Integer porcentaje) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        
        proyecto.setPorcentajeAvance(porcentaje);
        
        if (porcentaje >= 100) {
            proyecto.setEstado(EstadoProyecto.COMPLETADO);
            proyecto.setFechaFinReal(LocalDateTime.now());
        }
        
        return convertToDTO(proyectoRepository.save(proyecto));
    }
    
    @Transactional
    public void eliminarProyecto(Long id) {
        proyectoRepository.deleteById(id);
    }
    
    // ========== Tareas ==========
    
    @Transactional
    public TareaDTO crearTarea(CreateTareaRequest request) {
        Proyecto proyecto = proyectoRepository.findById(request.proyectoId())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        
        Tarea tarea = new Tarea();
        tarea.setTitulo(request.titulo());
        tarea.setDescripcion(request.descripcion());
        tarea.setProyecto(proyecto);
        tarea.setAsignadoA(request.asignadoA());
        tarea.setFechaLimite(request.fechaLimite());
        tarea.setHorasEstimadas(request.horasEstimadas());
        tarea.setEstado("PENDIENTE");
        
        Tarea saved = tareaRepository.save(tarea);
        return convertToDTO(saved);
    }
    
    public List<TareaDTO> listarTareasPorProyecto(Long proyectoId) {
        return tareaRepository.findByProyectoId(proyectoId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public TareaDTO actualizarEstadoTarea(Long tareaId, String estado) {
        Tarea tarea = tareaRepository.findById(tareaId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));
        
        tarea.setEstado(estado);
        if ("COMPLETADA".equals(estado)) {
            tarea.setFechaCompletado(LocalDateTime.now());
        }
        
        // Actualizar avance del proyecto automáticamente
        Proyecto proyecto = tarea.getProyecto();
        Long completadas = tareaRepository.countTareasCompletadasByProyecto(proyecto.getId());
        Long total = tareaRepository.findByProyectoId(proyecto.getId()).stream().count();
        
        if (total > 0) {
            int nuevoAvance = (int) ((completadas.doubleValue() / total) * 100);
            proyecto.setPorcentajeAvance(nuevoAvance);
            proyectoRepository.save(proyecto);
        }
        
        return convertToDTO(tareaRepository.save(tarea));
    }
    
    // ========== KPIs ==========
    
    public Double getAvancePromedio() {
        Double promedio = proyectoRepository.getAvancePromedio();
        return promedio != null ? promedio : 0.0;
    }
    
    // ========== Métodos auxiliares (DTO conversion) ==========
    
    private ProyectoDTO convertToDTO(Proyecto proyecto) {
        List<TareaDTO> tareasDTO = proyecto.getTareas().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        Long completadas = tareaRepository.countTareasCompletadasByProyecto(proyecto.getId());
        
        return new ProyectoDTO(
            proyecto.getId(),
            proyecto.getNombre(),
            proyecto.getDescripcion(),
            proyecto.getTipo(),
            proyecto.getEstado(),
            proyecto.getFechaInicio(),
            proyecto.getFechaFinEstimada(),
            proyecto.getPorcentajeAvance(),
            proyecto.getPresupuestoAsignado(),
            proyecto.getResponsableId(),
            tareasDTO,
            completadas != null ? completadas.intValue() : 0
        );
    }
    
    private TareaDTO convertToDTO(Tarea tarea) {
        return new TareaDTO(
            tarea.getId(),
            tarea.getTitulo(),
            tarea.getDescripcion(),
            tarea.getProyecto().getId(),
            tarea.getAsignadoA(),
            tarea.getEstado(),
            tarea.getFechaLimite(),
            tarea.getHorasEstimadas()
        );
    }
}