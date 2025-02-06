require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user" VARCHAR(255) NOT NULL,
  text VARCHAR(1000) NOT NULL,
  added DATE
);

INSERT INTO messages ("user", text, added) 
VALUES 
    ('Hunter', 'Hello All', '2025-02-04'),
    ('Sarah', 'Hey everyone! Excited to be here!', '2025-02-04'),
    ('Mike', 'This message board is great!', '2025-02-05'),
    ('Emma', 'Just found this community, looks awesome', '2025-02-05'),
    ('Alex', 'Anyone here interested in web development?', '2025-02-05'),
    ('Luna', 'Beautiful day for coding!', '2025-02-06'),
    ('James', 'Working on my first Node.js project', '2025-02-06'),
    ('Rachel', 'Has anyone tried Railway for deployment?', '2025-02-06'),
    ('David', 'Looking forward to learning from everyone here', '2025-02-06'),
    ('Sophie', 'Hello from Seattle!', '2025-02-06')
    ON CONFLICT DO NOTHING;
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log("Connecting to database...");
    await client.connect();

    console.log("Seeding database...");
    await client.query(SQL);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
