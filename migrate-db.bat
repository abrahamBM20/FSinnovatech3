@echo off
echo === Migrando usuarios-service ===
cd backend/usuarios-service
call ./mvnw flyway:migrate

echo.
echo === Migrando proyectos-service ===
cd ../proyectos-service
call ./mvnw flyway:migrate

echo.
echo === Migracion completada ===
pause