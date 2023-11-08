export default async function loginAdmin(email, phone) {
  try {
    const user = process.env.ADMIN_USER;
    const pass = process.env.ADMIN_PASSWORD;
    if (user === email && pass === phone) {
        return true;
}
  } catch (err) {
    throw err;
  }
}
