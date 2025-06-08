import { PrismaClient } from "../src/generated/prisma"; // ✅ FIXED
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "vedlakkad05@gmail.com";
  const hashedPassword = await bcrypt.hash("passwd", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (existingAdmin) {
    throw new Error("This admin already exists");
  }

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      username: "ved",
      role: "ADMIN",
    },
  });

  console.log("Admin created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
