package com.innovatech.proyectos_service.controller;

import com.innovatech.proyectos_service.dto.CreateProyectoRequest;
import com.innovatech.proyectos_service.dto.CreateTareaRequest;
import com.innovatech.proyectos_service.dto.ProyectoDTO;
import com.innovatech.proyectos_service.dto.TareaDTO;
import com.innovatech.proyectos_service.service.ProyectoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    // ========== CRUD Proyectos ==========
    
    @PostMapping
    public ResponseEntity<ProyectoDTO> crearProyecto(@Valid @RequestBody CreateProyectoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(proyectoService.crearProyecto(request));
    }
    
    @GetMapping
    public ResponseEntity<List<ProyectoDTO>> listarProyectos() {
        return ResponseEntity.ok(proyectoService.listarProyectos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProyectoDTO> obtenerProyecto(@PathVariable Long id) {
        return ResponseEntity.ok(proyectoService.obtenerProyecto(id));
    }
    
    @GetMapping("/responsable/{responsableId}")
    public ResponseEntity<List<ProyectoDTO>> listarPorResponsable(@PathVariable Long responsableId) {
        return ResponseEntity.ok(proyectoService.listarPorResponsable(responsableId));
    }
    
    @PutMapping("/{id}/avance")
    public ResponseEntity<ProyectoDTO> actualizarAvance(@PathVariable Long id, 
                                                         @RequestParam Integer porcentaje) {
        return ResponseEntity.ok(proyectoService.actualizarAvance(id, porcentaje));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProyecto(@PathVariable Long id) {
        proyectoService.eliminarProyecto(id);
        return ResponseEntity.noContent().build();
    }
    
    // ========== Gestión de Tareas ==========
    
    @PostMapping("/tareas")
    public ResponseEntity<TareaDTO> crearTarea(@Valid @RequestBody CreateTareaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(proyectoService.crearTarea(request));
    }
    
    @GetMapping("/{proyectoId}/tareas")
    public ResponseEntity<List<TareaDTO>> listarTareasPorProyecto(@PathVariable Long proyectoId) {
        return ResponseEntity.ok(proyectoService.listarTareasPorProyecto(proyectoId));
    }
    
    @PutMapping("/tareas/{tareaId}/estado")
    public ResponseEntity<TareaDTO> actualizarEstadoTarea(@PathVariable Long tareaId,
                                                           @RequestParam String estado) {
        return ResponseEntity.ok(proyectoService.actualizarEstadoTarea(tareaId, estado));
    }
    
    // ========== KPIs (para el dashboard) ==========
    
    @GetMapping("/kpis/avance-promedio")
    public ResponseEntity<Double> getAvancePromedio() {
        return ResponseEntity.ok(proyectoService.getAvancePromedio());
    }
}