import { db as prisma } from "~/utils/db.server";
import bcrypt from "bcryptjs";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      userName: userName,
      password: hashedPassword,
    },
  });
}

export async function findUserByUsername(userName: string) {
  return prisma.user.findUnique({
    where: { userName },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function verifyLogin(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}
