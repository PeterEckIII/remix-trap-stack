import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { createUser } from "~/models/user.server";

export const createNormalUser = (user?: Omit<User, "id">) => {
  return createUser({
    email: faker.internet.email().toLowerCase(),
    firstName: faker.internet.displayName(),
    lastName: faker.internet.displayName(),
    role: "USER",
    ...user,
  });
};

export const createAdminUser = (user?: Omit<User, "id">) => {
  return createUser({
    email: faker.internet.email().toLowerCase(),
    role: "ADMIN",
    firstName: faker.internet.displayName(),
    lastName: faker.internet.displayName(),
    ...user,
  });
};
