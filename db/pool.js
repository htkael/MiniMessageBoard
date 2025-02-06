const { Pool } = require("pg");
require("dotenv").config();

// Separate config for clarity
const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // Add these explicit settings
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

// Create pool with detailed error handling
const pool = new Pool(config);

// Add specific connection error logging
pool.on("connect", () => {
  console.log("Database connection established");
});

pool.on("error", (err) => {
  console.error("Database error:", err);
  // Don't exit process on connection error
});

pool.on("acquire", () => {
  console.log("Client acquired from pool");
});

// Test connection immediately
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to database");
    client.release();
  } catch (err) {
    console.error("Error testing connection:", err.message);
  }
};

testConnection();

module.exports = pool;
