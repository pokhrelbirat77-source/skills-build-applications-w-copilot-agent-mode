import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@example.com',
        password: 'hashed-password-1',
        fitnessLevel: 'Advanced',
        goals: ['Half Marathon', 'Strength Gains']
      },
      {
        name: 'Leo Kim',
        email: 'leo.kim@example.com',
        password: 'hashed-password-2',
        fitnessLevel: 'Intermediate',
        goals: ['Improve Mobility', '10K Run']
      },
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        password: 'hashed-password-3',
        fitnessLevel: 'Intermediate',
        goals: ['Cycle Endurance', 'Core Stability']
      },
      {
        name: 'Noah Brooks',
        email: 'noah.brooks@example.com',
        password: 'hashed-password-4',
        fitnessLevel: 'Beginner',
        goals: ['Consistency', 'Weight Loss']
      }
    ]);

    const trailBlazers = await Team.create({
      name: 'Trail Blazers',
      description: 'A mountain-ready crew focused on endurance and agility.',
      captain: users[0]._id,
      members: [users[0]._id, users[2]._id
      ]
    });

    const velocitySquad = await Team.create({
      name: 'Velocity Squad',
      description: 'A performance-driven team for HIIT, speed work, and interval training.',
      captain: users[1]._id,
      members: [users[1]._id, users[3]._id]
    });

    await Promise.all([
      User.findByIdAndUpdate(users[0]._id, { teamId: trailBlazers._id }, { new: true }),
      User.findByIdAndUpdate(users[1]._id, { teamId: velocitySquad._id }, { new: true }),
      User.findByIdAndUpdate(users[2]._id, { teamId: trailBlazers._id }, { new: true }),
      User.findByIdAndUpdate(users[3]._id, { teamId: velocitySquad._id }, { new: true })
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 520,
        date: new Date('2026-08-10'),
        notes: 'Tempo run through the city loop.'
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 610,
        date: new Date('2026-08-11'),
        notes: 'Upper-body strength and mobility work.'
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 38,
        caloriesBurned: 480,
        date: new Date('2026-08-12'),
        notes: 'Steady-state ride with hill intervals.'
      },
      {
        userId: users[3]._id,
        type: 'Yoga',
        durationMinutes: 25,
        caloriesBurned: 180,
        date: new Date('2026-08-13'),
        notes: 'Recovery and flexibility session.'
      }
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        rank: 1,
        score: 980,
        totalDistanceKm: 84.5,
        streakDays: 17
      },
      {
        userId: users[1]._id,
        rank: 2,
        score: 930,
        totalDistanceKm: 74.2,
        streakDays: 14
      },
      {
        userId: users[2]._id,
        rank: 3,
        score: 890,
        totalDistanceKm: 69.1,
        streakDays: 12
      },
      {
        userId: users[3]._id,
        rank: 4,
        score: 810,
        totalDistanceKm: 52.8,
        streakDays: 9
      }
    ]);

    await Workout.insertMany([
      {
        name: 'Cardio Blast',
        category: 'Endurance',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        equipment: ['Jump rope', 'Bench'],
        focus: ['Heart rate', 'Coordination']
      },
      {
        name: 'Core Stability',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        equipment: ['Mat'],
        focus: ['Balance', 'Core']
      },
      {
        name: 'Power Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 40,
        equipment: ['Dumbbells', 'Kettlebell'],
        focus: ['Explosiveness', 'Full Body']
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
