const registeredUsers = [
  { email: "alice@example.com", password: "password123" },
  { email: "bob@example.com", password: "password456" },
];

function getRegisteredUsers() {
  return registeredUsers;
}

module.exports = { getRegisteredUsers };
