export const POST = async (request: Request) => {
  console.log(request.json(), request);
  const { name, email, password } = await request.json();
  // Create A DB Connection
  // Encrypt The Password
  // Form a DB payload
  // Update in the DB
};
