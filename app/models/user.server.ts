import type { User } from "@prisma/client";
import { prisma } from "../utils/db.server";

export async function createUser(user: Omit<User, "id">) {
  return await prisma.user.create({ data: user });
}
