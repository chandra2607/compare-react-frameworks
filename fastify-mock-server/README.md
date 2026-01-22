# Fastify Mock Server - Olympics Data

Mock API server that provides Olympics athlete data for performance testing.

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Endpoints

### GET /dummy-table-data
Returns 1000 Olympics athlete records with the following fields:
- `athleteId`: Unique athlete identifier (e.g., ATH0001)
- `athleteName`: Full name of the athlete
- `country`: Country representing
- `sport`: Sport category
- `event`: Specific event
- `medalCount`: Total medals won
- `goldMedals`: Number of gold medals
- `silverMedals`: Number of silver medals
- `bronzeMedals`: Number of bronze medals
- `totalPoints`: Calculated points (gold=3, silver=2, bronze=1)

### GET /health
Health check endpoint

## Server Details
- Port: 3001
- Host: 0.0.0.0
- CORS: Enabled for all origins
