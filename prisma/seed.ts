import {
  PrismaClient,
  ProjectStatus,
} from "../node_modules/.pnpm/@prisma+client@6.18.0_prisma@6.18.0_typescript@5.9.3__typescript@5.9.3/node_modules/@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing data (in reverse order of dependencies)
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.company.deleteMany();

  console.log("🗑️  Cleaned existing data");

  // Hash passwords for security
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Define unique wallet addresses to prevent conflicts
  const clientWalletAddresses = [
    "0x6b34Bd29078b5795f82122F06b1b1636AE8e0025",
    "0x1000000000000000000000000000000000000002",
    "0x1000000000000000000000000000000000000003",
    "0x1000000000000000000000000000000000000004",
  ];
  const companyWalletAddresses = [
    "0x6b34Bd29078b5795f82122F06b1b1636AE8e0025",
    "0x2000000000000000000000000000000000000002",
    "0x2000000000000000000000000000000000000003",
  ];
  const projectVaultAddresses = [
    "0x3000000000000000000000000000000000000001",
    "0x3000000000000000000000000000000000000002",
    "0x3000000000000000000000000000000000000003",
    "0x3000000000000000000000000000000000000004",
    "0x3000000000000000000000000000000000000005",
    "0x3000000000000000000000000000000000000006",
  ];

  // Create sample clients
  const clients = await prisma.client.createMany({
    data: [
      {
        email: "john.doe@example.com",
        password: hashedPassword,
        walletAddress: clientWalletAddresses[0],
      },
      {
        email: "jane.smith@example.com",
        password: hashedPassword,
        walletAddress: clientWalletAddresses[1],
      },
      {
        email: "bob.wilson@example.com",
        password: hashedPassword,
        walletAddress: clientWalletAddresses[2],
      },
      {
        email: "alice.johnson@example.com",
        password: hashedPassword,
        walletAddress: clientWalletAddresses[3],
      },
    ],
  });

  console.log(`👥 Created ${clients.count} clients`);

  // Create sample companies
  const companies = await prisma.company.createMany({
    data: [
      {
        email: "techcorp@company.com",
        password: hashedPassword,
        walletAddress: companyWalletAddresses[0],
      },
      {
        email: "designstudio@company.com",
        password: hashedPassword,
        walletAddress: companyWalletAddresses[1],
      },
      {
        email: "webagency@company.com",
        password: hashedPassword,
        walletAddress: companyWalletAddresses[2],
      },
    ],
  });

  console.log(`🏢 Created ${companies.count} companies`);

  // Get created records for relationships
  const createdClients = await prisma.client.findMany();
  const createdCompanies = await prisma.company.findMany();

  // Ensure we have enough records for relationships
  if (createdClients.length < 4 || createdCompanies.length < 3) {
    throw new Error("Not enough clients or companies created for seeding");
  }

  // Create sample projects with all required fields
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: "E-commerce Website Development",
        description:
          "Build a modern e-commerce platform with payment integration, inventory management, and user authentication.",
        status: ProjectStatus.IN_PROGRESS,
        priority: 1,
        projectCost: 15000.0,
        vaultAddress: projectVaultAddresses[0],
        companyId: createdCompanies[0]?.id ?? 0,
        clientId: createdClients[0]?.id ?? 0,
      },
    }),
    prisma.project.create({
      data: {
        title: "Mobile App UI/UX Design",
        description:
          "Design a comprehensive UI/UX for a fitness tracking mobile application.",
        status: ProjectStatus.PENDING,
        priority: 2,
        projectCost: 8500.0,
        vaultAddress: projectVaultAddresses[1],
        companyId: createdCompanies[1]?.id ?? 0,
        clientId: createdClients[1]?.id ?? 0,
      },
    }),
    prisma.project.create({
      data: {
        title: "Corporate Website Redesign",
        description:
          "Complete redesign of corporate website with modern design principles and improved user experience.",
        status: ProjectStatus.COMPLETED,
        priority: 3,
        projectCost: 12000.0,
        vaultAddress: projectVaultAddresses[2],
        companyId: createdCompanies[2]?.id ?? 0,
        clientId: createdClients[2]?.id ?? 0,
      },
    }),
    prisma.project.create({
      data: {
        title: "Database Migration Project",
        description:
          "Migrate legacy database to modern cloud infrastructure with zero downtime.",
        status: ProjectStatus.IN_PROGRESS,
        priority: 1,
        projectCost: 20000.0,
        vaultAddress: projectVaultAddresses[3],
        companyId: createdCompanies[0]?.id ?? 0,
        clientId: createdClients[3]?.id ?? 0,
      },
    }),
    prisma.project.create({
      data: {
        title: "Brand Identity Package",
        description:
          "Create complete brand identity including logo, color palette, typography, and brand guidelines.",
        status: ProjectStatus.PENDING,
        priority: 2,
        projectCost: 5000.0,
        vaultAddress: projectVaultAddresses[4],
        companyId: createdCompanies[1]?.id ?? 0,
        clientId: createdClients[0]?.id ?? 0,
      },
    }),
    prisma.project.create({
      data: {
        title: "API Development & Integration",
        description:
          "Develop RESTful APIs and integrate with third-party services for data synchronization.",
        status: ProjectStatus.IN_PROGRESS,
        priority: 1,
        projectCost: 18000.0,
        vaultAddress: projectVaultAddresses[5],
        companyId: createdCompanies[2]?.id ?? 0,
        clientId: createdClients[1]?.id ?? 0,
      },
    }),
  ]);

  console.log(`📋 Created ${projects.length} projects`);

  console.log("🎉 Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   • ${clients.count} clients created`);
  console.log(`   • ${companies.count} companies created`);
  console.log(`   • ${projects.length} projects created`);
  console.log("\n💰 Project Costs:");
  projects.forEach((project, index) => {
    console.log(
      `   • ${project.title}: $${project.projectCost.toLocaleString()}`
    );
  });
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
