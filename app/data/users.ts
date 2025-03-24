const users = [
  {
    email: "aaqwertyuiopmnbvcxzsadfghlkj1236548790_s@a.com",
    password: "aaqwertyuiopmnbvcxzsadfghlkj1236548790_s@a.com",
  },
];

export const getUserByEmail = (email: any) => {
  const found = users.find((user) => user.email === email);
  return found;
};
