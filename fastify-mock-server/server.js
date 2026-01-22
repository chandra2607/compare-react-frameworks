import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});

// Enable CORS
await fastify.register(cors, {
  origin: true
});

// Generate Olympics data
function generateOlympicsData() {
  const countries = [
    'USA', 'China', 'Russia', 'Germany', 'United Kingdom', 'France', 'Japan', 
    'Australia', 'Italy', 'Canada', 'Netherlands', 'Brazil', 'Spain', 'Kenya',
    'Jamaica', 'South Korea', 'New Zealand', 'Hungary', 'Norway', 'Sweden'
  ];
  
  const sports = [
    'Athletics', 'Swimming', 'Gymnastics', 'Basketball', 'Football', 'Tennis',
    'Cycling', 'Boxing', 'Rowing', 'Volleyball', 'Wrestling', 'Judo', 'Fencing',
    'Archery', 'Badminton', 'Table Tennis', 'Hockey', 'Sailing', 'Shooting', 'Diving'
  ];

  const events = [
    '100m Sprint', '200m Sprint', '400m Sprint', '800m Run', '1500m Run', 'Marathon',
    'Freestyle', 'Butterfly', 'Backstroke', 'Breaststroke', 'Floor Exercise', 'Vault',
    'Parallel Bars', 'Singles', 'Doubles', 'Team Event', 'Individual All-Around',
    'Relay', 'Long Jump', 'High Jump', 'Javelin', 'Shot Put', 'Pole Vault'
  ];

  const firstNames = [
    'Michael', 'Katie', 'Usain', 'Simone', 'Mo', 'Allyson', 'Jason', 'Jessica',
    'Ryan', 'Serena', 'Rafael', 'Laura', 'Adam', 'Sarah', 'Chris', 'Emma',
    'David', 'Sophie', 'James', 'Lily', 'Tom', 'Anna', 'Jack', 'Olivia'
  ];

  const lastNames = [
    'Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris'
  ];

  const data = [];
  
  for (let i = 1; i <= 1000; i++) {
    const goldMedals = Math.floor(Math.random() * 15);
    const silverMedals = Math.floor(Math.random() * 12);
    const bronzeMedals = Math.floor(Math.random() * 10);
    const medalCount = goldMedals + silverMedals + bronzeMedals;
    const totalPoints = (goldMedals * 3) + (silverMedals * 2) + bronzeMedals;

    data.push({
      athleteId: `ATH${String(i).padStart(4, '0')}`,
      athleteName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      sport: sports[Math.floor(Math.random() * sports.length)],
      event: events[Math.floor(Math.random() * events.length)],
      medalCount: medalCount,
      goldMedals: goldMedals,
      silverMedals: silverMedals,
      bronzeMedals: bronzeMedals,
      totalPoints: totalPoints
    });
  }

  return data;
}

// Cache the data
const olympicsData = generateOlympicsData();

// Routes
fastify.get('/dummy-table-data', async (request, reply) => {
  return {
    success: true,
    data: olympicsData,
    total: olympicsData.length
  };
});

fastify.get('/health', async (request, reply) => {
  return { status: 'ok', message: 'Olympics Mock API is running' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`🚀 Mock API server running on http://localhost:3001`);
    console.log(`📊 Endpoint: http://localhost:3001/dummy-table-data`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
