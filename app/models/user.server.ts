import type { User } from "@prisma/client";
import { prisma } from "../utils/db.server";

export async function createUser(
  user: Omit<User, "id" | "updatedAt" | "createdAt">
) {
  return await prisma.user.create({ data: user });
}

export async function getUserById(userId: User["id"]) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByEmail(email: User["email"]) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: User["username"]) {
  return await prisma.user.findUnique({ where: { username } });
}

export async function updateUser(userId: User["id"], user: Partial<User>) {
  return await prisma.user.update({ where: { id: userId }, data: user });
}

export async function deleteUser(userId: User["id"]) {
  return await prisma.user.delete({ where: { id: userId } });
}
