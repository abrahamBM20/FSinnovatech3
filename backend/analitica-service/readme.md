# Analytics Service - Innovatech Solutions

## Descripción
Microservicio de analítica en tiempo real usando FastAPI y Python. Implementa **Patrón Strategy** para calcular diferentes tipos de KPIs.

## Patrones de Diseño Implementados
1. **Strategy Pattern**: Diferentes estrategias de cálculo de métricas
2. **Singleton**: Instancia única del servicio de analítica
3. **DTO Pattern**: Schemas de Pydantic

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | KPIs principales |
| GET | `/api/analytics/kpis` | Todos los KPIs |
| GET | `/api/analytics/proyectos/avance` | KPIs por proyecto |
| GET | `/api/analytics/recursos/carga` | Carga de recursos |
| GET | `/api/analytics/metricas/{tipo}` | Strategy: métrica específica |

## Ejecución
```bash
pip install -r requirements.txt
cd app && python -m uvicorn main:app --reload --port 8000