import mongoose from 'mongoose';

export async function initializeDatabase() {
  try {
    // Create collections with validations
    await mongoose.connection.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "name", "googleId"],
          properties: {
            email: {
              bsonType: "string"
            },
            name: {
              bsonType: "string"
            },
            googleId: {
              bsonType: "string"
            },
            image: {
              bsonType: "string"
            }
          }
        }
      }
    });

    await mongoose.connection.createCollection("interviews", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "candidateName", "candidateEmail", "date", "startTime", "endTime", "userId"],
          properties: {
            title: {
              bsonType: "string"
            },
            candidateName: {
              bsonType: "string"
            },
            candidateEmail: {
              bsonType: "string"
            },
            date: {
              bsonType: "string"
            },
            startTime: {
              bsonType: "string"
            },
            endTime: {
              bsonType: "string"
            },
            description: {
              bsonType: "string"
            },
            status: {
              enum: ["scheduled", "completed", "cancelled"]
            },
            userId: {
              bsonType: "objectId"
            }
          }
        }
      }
    });

    // Create indexes
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.collection('users').createIndex({ googleId: 1 }, { unique: true });
    await mongoose.connection.collection('interviews').createIndex({ userId: 1, date: 1 });

    console.log('Database collections and indexes initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
} 