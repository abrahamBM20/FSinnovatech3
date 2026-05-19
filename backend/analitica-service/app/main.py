from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import httpx

# ========== CONFIGURACIÓN ==========
USUARIOS_SERVICE_URL = "http://localhost:8080"
PROYECTOS_SERVICE_URL = "http://localhost:8081"

# ========== SCHEMAS / DTOs ==========
class KPIDashboard(BaseModel):
    total_proyectos: int
    proyectos_activos: int
    proyectos_completados: int
    avance_promedio: float
    utilizacion_recursos: float
    tareas_pendientes: int
    tareas_completadas_hoy: int

class ProyectoKPI(BaseModel):
    id: int
    nombre: str
    tipo: str
    estado: str
    porcentaje_avance: int
    tareas_completadas: int
    tareas_totales: int
    tiempo_restante_dias: Optional[int]

class RecursoKPI(BaseModel):
    usuario_id: int
    username: str
    tareas_asignadas: int
    tareas_completadas: int
    carga_trabajo: float
    horas_estimadas_total: int

class TipoMetrica(str, Enum):
    AVANCE_PROYECTOS = "avance_proyectos"
    CARGA_RECURSOS = "carga_recursos"
    TAREAS_CRITICAS = "tareas_criticas"
    EFICIENCIA_EQUIPO = "eficiencia_equipo"

# ========== SERVICIO DE ANALÍTICA ==========
class AnalyticsService:
    def __init__(self):
        self.usuarios_url = USUARIOS_SERVICE_URL
        self.proyectos_url = PROYECTOS_SERVICE_URL
    
    async def get_dashboard_kpis(self) -> KPIDashboard:
        async with httpx.AsyncClient() as client:
            # Consumir microservicio de proyectos
            try:
                proyectos_response = await client.get(f"{self.proyectos_url}/api/proyectos")
                proyectos = proyectos_response.json() if proyectos_response.status_code == 200 else []
            except:
                proyectos = []
            
            # Consumir tareas
            try:
                tareas_response = await client.get(f"{self.proyectos_url}/api/proyectos/tareas")
                tareas = tareas_response.json() if tareas_response.status_code == 200 else []
            except:
                tareas = []
        
        total = len(proyectos)
        activos = sum(1 for p in proyectos if p.get('estado') == 'ACTIVO')
        completados = sum(1 for p in proyectos if p.get('estado') == 'COMPLETADO')
        avance_promedio = sum(p.get('porcentajeAvance', 0) for p in proyectos) / total if total > 0 else 0
        
        tareas_pendientes = sum(1 for t in tareas if t.get('estado') == 'PENDIENTE')
        
        tareas_completadas_hoy = sum(
            1 for t in tareas 
            if t.get('estado') == 'COMPLETADA'
        )
        
        utilizacion_recursos = (tareas_completadas_hoy / (tareas_pendientes + tareas_completadas_hoy + 1)) * 100
        
        return KPIDashboard(
            total_proyectos=total,
            proyectos_activos=activos,
            proyectos_completados=completados,
            avance_promedio=round(avance_promedio, 1),
            utilizacion_recursos=round(utilizacion_recursos, 1),
            tareas_pendientes=tareas_pendientes,
            tareas_completadas_hoy=tareas_completadas_hoy
        )
    
    async def get_proyectos_avance(self) -> List[ProyectoKPI]:
        async with httpx.AsyncClient() as client:
            try:
                proyectos_response = await client.get(f"{self.proyectos_url}/api/proyectos")
                proyectos = proyectos_response.json() if proyectos_response.status_code == 200 else []
            except:
                proyectos = []
            
            try:
                tareas_response = await client.get(f"{self.proyectos_url}/api/proyectos/tareas")
                tareas = tareas_response.json() if tareas_response.status_code == 200 else []
            except:
                tareas = []
        
        tareas_por_proyecto = {}
        for t in tareas:
            pid = t.get('proyectoId')
            if pid not in tareas_por_proyecto:
                tareas_por_proyecto[pid] = []
            tareas_por_proyecto[pid].append(t)
        
        resultados = []
        for proyecto in proyectos:
            tareas_proyecto = tareas_por_proyecto.get(proyecto['id'], [])
            total_tareas = len(tareas_proyecto)
            completadas = sum(1 for t in tareas_proyecto if t.get('estado') == 'COMPLETADA')
            
            tiempo_restante = None
            fecha_fin = proyecto.get('fechaFinEstimada')
            if fecha_fin:
                try:
                    fecha_fin_dt = datetime.fromisoformat(fecha_fin.replace('Z', '+00:00'))
                    dias_restantes = (fecha_fin_dt - datetime.now()).days
                    tiempo_restante = max(0, dias_restantes)
                except:
                    pass
            
            resultados.append(ProyectoKPI(
                id=proyecto['id'],
                nombre=proyecto['nombre'],
                tipo=proyecto.get('tipo', 'N/A'),
                estado=proyecto.get('estado', 'N/A'),
                porcentaje_avance=proyecto.get('porcentajeAvance', 0),
                tareas_completadas=completadas,
                tareas_totales=total_tareas,
                tiempo_restante_dias=tiempo_restante
            ))
        
        return resultados
    
    async def get_carga_recursos(self) -> List[RecursoKPI]:
        async with httpx.AsyncClient() as client:
            try:
                tareas_response = await client.get(f"{self.proyectos_url}/api/proyectos/tareas")
                tareas = tareas_response.json() if tareas_response.status_code == 200 else []
            except:
                tareas = []
        
        tareas_por_usuario = {}
        for t in tareas:
            asignado_a = t.get('asignadoA')
            if asignado_a:
                if asignado_a not in tareas_por_usuario:
                    tareas_por_usuario[asignado_a] = []
                tareas_por_usuario[asignado_a].append(t)
        
        resultados = []
        for uid, tareas_usuario in tareas_por_usuario.items():
            total_tareas = len(tareas_usuario)
            completadas = sum(1 for t in tareas_usuario if t.get('estado') == 'COMPLETADA')
            horas_total = sum(t.get('horasEstimadas', 0) for t in tareas_usuario)
            
            carga = ((total_tareas - completadas) / (total_tareas + 1)) * 100
            
            resultados.append(RecursoKPI(
                usuario_id=uid,
                username=f"Usuario {uid}",
                tareas_asignadas=total_tareas,
                tareas_completadas=completadas,
                carga_trabajo=round(carga, 1),
                horas_estimadas_total=horas_total
            ))
        
        return resultados
    
    async def calcular_metrica(self, tipo_metrica: TipoMetrica) -> Dict[str, Any]:
        if tipo_metrica == TipoMetrica.AVANCE_PROYECTOS:
            proyectos = await self.get_proyectos_avance()
            return {
                "tipo": "avance_proyectos",
                "timestamp": datetime.now().isoformat(),
                "data": [p.dict() for p in proyectos],
                "resumen": {
                    "promedio_avance": sum(p.porcentaje_avance for p in proyectos) / len(proyectos) if proyectos else 0,
                }
            }
        
        elif tipo_metrica == TipoMetrica.CARGA_RECURSOS:
            recursos = await self.get_carga_recursos()
            return {
                "tipo": "carga_recursos",
                "timestamp": datetime.now().isoformat(),
                "data": [r.dict() for r in recursos],
                "resumen": {
                    "carga_promedio": sum(r.carga_trabajo for r in recursos) / len(recursos) if recursos else 0
                }
            }
        
        elif tipo_metrica == TipoMetrica.TAREAS_CRITICAS:
            return {
                "tipo": "tareas_criticas",
                "timestamp": datetime.now().isoformat(),
                "data": [],
                "resumen": {"total_criticas": 0}
            }
        
        else:
            dashboard = await self.get_dashboard_kpis()
            return {
                "tipo": "eficiencia_equipo",
                "timestamp": datetime.now().isoformat(),
                "metricas": {
                    "eficiencia_general": dashboard.utilizacion_recursos,
                    "avance_promedio": dashboard.avance_promedio
                }
            }

# ========== INSTANCIA SINGLETON ==========
analytics_service = AnalyticsService()

# ========== FASTAPI APP ==========
app = FastAPI(
    title="Innovatech Analytics Service",
    description="Microservicio de Analítica - Patrón Strategy",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== ROUTER ==========
router = APIRouter()

@router.get("/dashboard", response_model=KPIDashboard)
async def get_dashboard():
    return await analytics_service.get_dashboard_kpis()

@router.get("/kpis")
async def get_all_kpis():
    dashboard = await analytics_service.get_dashboard_kpis()
    proyectos = await analytics_service.get_proyectos_avance()
    recursos = await analytics_service.get_carga_recursos()
    
    return {
        "dashboard": dashboard.dict(),
        "proyectos": [p.dict() for p in proyectos],
        "recursos": [r.dict() for r in recursos],
        "timestamp": datetime.now().isoformat()
    }

@router.get("/proyectos/avance", response_model=List[ProyectoKPI])
async def get_proyectos_avance():
    return await analytics_service.get_proyectos_avance()

@router.get("/recursos/carga", response_model=List[RecursoKPI])
async def get_recursos_carga():
    return await analytics_service.get_carga_recursos()

@router.get("/metricas/{tipo}")
async def get_metrica_por_tipo(tipo: TipoMetrica):
    """PATRÓN STRATEGY - Elige dinámicamente la métrica a calcular"""
    return await analytics_service.calcular_metrica(tipo)

@router.get("/health")
async def health():
    return {"status": "healthy", "service": "analitica-service", "port": 8000}

# ========== INCLUIR ROUTER ==========
app.include_router(router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
async def root():
    return {
        "service": "Innovatech Analytics Service",
        "endpoints": [
            "/api/analytics/dashboard",
            "/api/analytics/kpis",
            "/api/analytics/proyectos/avance",
            "/api/analytics/recursos/carga",
            "/api/analytics/metricas/{tipo}"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)