# MeasurePro Quantity Measurement App

Full-stack quantity measurement application with a Spring Boot backend and a React + Vite frontend.

## Backend

```bash
./mvnw clean install
./mvnw spring-boot:run
```

Backend defaults to `http://localhost:8081`.

Useful endpoints:

- Swagger/OpenAPI: `http://localhost:8081/swagger-ui/index.html`
- API docs: `http://localhost:8081/api-docs`
- Health: `http://localhost:8081/actuator/health`
- H2 console: `http://localhost:8081/h2-console`

## Frontend

```bash
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173` and proxies `/api` and `/actuator` to the backend.

Optional environment override:

```bash
cp .env.example .env
```

## Implemented Frontend Features

- Responsive analytics dashboard inspired by the supplied MeasurePro design files.
- Unit conversion for length, weight, volume, and temperature.
- Arithmetic operations backed by APIs: add, subtract, multiply, divide, and percentage.
- Unit comparison matrix with CSV export.
- Backend history search, filtering, CSV export, and clear-all support.
- Dark/light mode, toast notifications, loading states, empty states, error boundary, and 404 page.

## Backend Integration

The frontend calls the existing Spring Boot API under `/api/v1/quantities`. The backend also includes:

- `POST /api/v1/quantities/multiply`
- `POST /api/v1/quantities/percentage`
- `DELETE /api/v1/quantities/history`
- CORS support for Vite on `http://localhost:5173`
