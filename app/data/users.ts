const users = [
  {
    email: "a@a.com",
    password: "a@a.com",
  },
];

export const getUserByEmail = (email: any) => {
  const found = users.find((user) => user.email === email);
  return found;
};
