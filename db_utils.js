const { Client } = require("pg");

function getConnection(username, password, database) {
  return new Client({
    host: process.env.PGHOST || "localhost",
    database,
    user: username,
    password,
    port: Number(process.env.PGPORT || 5432),
  });
}

async function getUsers(callback) {
  const client = getConnection(
    process.env.dbuser,
    process.env.dbpwd,
    process.env.PGDATABASE || "mabase",
  );
  let error;
  let users;

  try {
    await client.connect();
    const result = await client.query("SELECT * FROM users");
    users = result.rows;
  } catch (queryError) {
    error = queryError;
  }

  try {
    await client.end();
  } catch (closeError) {
    error = error || closeError;
  }

  callback(error, users);
}

async function insert_user(user) {
  if (!user || typeof user.email !== "string") {
    throw new TypeError("user.email doit être une chaîne de caractères.");
  }

  const client = getConnection(
    process.env.dbuser,
    process.env.dbpwd,
    process.env.PGDATABASE || "mabase",
  );

  await client.connect();

  try {
    const result = await client.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [user.email],
    );
    return result.rows[0];
  } finally {
    await client.end();
  }
}

module.exports = { getConnection, getUsers, insert_user };

if (require.main === module) {
  getUsers((error, users) => {
    if (error) {
      console.error("Erreur de connexion ou de requête PostgreSQL :", error.message);
      process.exitCode = 1;
      return;
    }

    console.log(users);
  });
}
