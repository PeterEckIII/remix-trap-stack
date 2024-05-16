import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "peter@remix.run",
      username: "peter32",
      role: "USER",
    },
  });
}

main()
  .then(() => {
    console.log(chalk.green(`Seed successful 🌱`));
  })
  .catch((e) => {
    console.error(e);
    console.log(chalk.red(`Error: Seed failed 🚫`));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.user.deleteMany({ where: { email: "peter@remix.run" } });
    await prisma.$disconnect();
  });
