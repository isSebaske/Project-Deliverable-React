const users = [
  {
    email: "test@test.com",
    password: "testpassword",
    permission: true,
  },
  {
    email: "test2@test.com",
    password: "testpassword",
    permission: false,
  },
];

export function getUsers() {
  return users;
}
