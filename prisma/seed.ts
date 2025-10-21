import { PrismaClient, ProjectStatus, TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing data (in reverse order of dependencies)
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.company.deleteMany();

  console.log("🗑️  Cleaned existing data");

  // Hash passwords for security
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Define unique wallet addresses to prevent conflicts
  const clientWalletAddresses = [
    "0x1000000000000000000000000000000000000001",
    "0x1000000000000000000000000000000000000002",
    "0x1000000000000000000000000000000000000003",
    "0x1000000000000000000000000000000000000004",
  ];
  const companyWalletAddresses = [
    "0x2000000000000000000000000000000000000001",
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

  // Create sample tasks for each project
  const tasks = await Promise.all([
    // Tasks for E-commerce Website Development
    prisma.task.create({
      data: {
        title: "Setup Development Environment",
        description:
          "Configure development environment, install dependencies, and setup version control.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2024-01-15"),
        assignedAt: new Date("2024-01-10"),
        taskCost: 500.0,
        projectId: projects[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Implement User Authentication",
        description:
          "Build secure user registration, login, and password reset functionality.",
        status: TaskStatus.IN_PROGRESS,
        priority: 1,
        dueDate: new Date("2024-01-25"),
        assignedAt: new Date("2024-01-15"),
        taskCost: 1200.0,
        projectId: projects[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Payment Gateway Integration",
        description:
          "Integrate Stripe payment gateway for secure online transactions.",
        status: TaskStatus.PENDING,
        priority: 1,
        dueDate: new Date("2024-02-01"),
        assignedAt: new Date("2024-01-20"),
        taskCost: 800.0,
        projectId: projects[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Product Catalog Management",
        description:
          "Build product catalog with categories, search, and filtering capabilities.",
        status: TaskStatus.PENDING,
        priority: 2,
        dueDate: new Date("2024-02-10"),
        assignedAt: new Date("2024-01-25"),
        taskCost: 1500.0,
        projectId: projects[0].id,
      },
    }),

    // Tasks for Mobile App UI/UX Design
    prisma.task.create({
      data: {
        title: "User Research & Personas",
        description:
          "Conduct user research and create detailed user personas for the fitness app.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2024-01-12"),
        assignedAt: new Date("2024-01-05"),
        taskCost: 1500.0,
        projectId: projects[1].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Wireframes & Prototypes",
        description:
          "Create detailed wireframes and interactive prototypes for all app screens.",
        status: TaskStatus.IN_PROGRESS,
        priority: 2,
        dueDate: new Date("2024-01-30"),
        assignedAt: new Date("2024-01-15"),
        taskCost: 2000.0,
        projectId: projects[1].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Visual Design System",
        description:
          "Create comprehensive visual design system with colors, typography, and components.",
        status: TaskStatus.PENDING,
        priority: 2,
        dueDate: new Date("2024-02-15"),
        assignedAt: new Date("2024-02-01"),
        taskCost: 1800.0,
        projectId: projects[1].id,
      },
    }),

    // Tasks for Corporate Website Redesign
    prisma.task.create({
      data: {
        title: "Content Audit & Strategy",
        description: "Audit existing content and develop new content strategy.",
        status: TaskStatus.COMPLETED,
        priority: 2,
        dueDate: new Date("2023-12-15"),
        assignedAt: new Date("2023-12-01"),
        taskCost: 750.0,
        projectId: projects[2].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Design System Creation",
        description:
          "Create comprehensive design system with components and guidelines.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2023-12-20"),
        assignedAt: new Date("2023-12-10"),
        taskCost: 1800.0,
        projectId: projects[2].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Frontend Development",
        description:
          "Implement responsive frontend using modern web technologies.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2024-01-05"),
        assignedAt: new Date("2023-12-25"),
        taskCost: 2500.0,
        projectId: projects[2].id,
      },
    }),

    // Tasks for Database Migration Project
    prisma.task.create({
      data: {
        title: "Database Analysis & Planning",
        description:
          "Analyze current database structure and plan migration strategy.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2024-01-10"),
        assignedAt: new Date("2024-01-01"),
        taskCost: 1000.0,
        projectId: projects[3].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Data Backup & Validation",
        description: "Create comprehensive backup and validate data integrity.",
        status: TaskStatus.IN_PROGRESS,
        priority: 0,
        dueDate: new Date("2024-01-20"),
        assignedAt: new Date("2024-01-12"),
        taskCost: 600.0,
        projectId: projects[3].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Migration Script Development",
        description:
          "Develop automated migration scripts for data transformation.",
        status: TaskStatus.PENDING,
        priority: 1,
        dueDate: new Date("2024-02-05"),
        assignedAt: new Date("2024-01-25"),
        taskCost: 2000.0,
        projectId: projects[3].id,
      },
    }),

    // Tasks for Brand Identity Package
    prisma.task.create({
      data: {
        title: "Brand Discovery Workshop",
        description:
          "Conduct brand discovery workshop to understand company values and vision.",
        status: TaskStatus.PENDING,
        priority: 1,
        dueDate: new Date("2024-02-05"),
        assignedAt: new Date("2024-01-25"),
        taskCost: 800.0,
        projectId: projects[4].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Logo Design Concepts",
        description: "Create multiple logo design concepts for client review.",
        status: TaskStatus.PENDING,
        priority: 2,
        dueDate: new Date("2024-02-15"),
        assignedAt: new Date("2024-02-01"),
        taskCost: 1200.0,
        projectId: projects[4].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Brand Guidelines Documentation",
        description:
          "Create comprehensive brand guidelines document with usage examples.",
        status: TaskStatus.PENDING,
        priority: 3,
        dueDate: new Date("2024-02-25"),
        assignedAt: new Date("2024-02-10"),
        taskCost: 900.0,
        projectId: projects[4].id,
      },
    }),

    // Tasks for API Development & Integration
    prisma.task.create({
      data: {
        title: "API Architecture Design",
        description:
          "Design RESTful API architecture with proper endpoints and data models.",
        status: TaskStatus.COMPLETED,
        priority: 1,
        dueDate: new Date("2024-01-20"),
        assignedAt: new Date("2024-01-10"),
        taskCost: 1500.0,
        projectId: projects[5].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Core API Development",
        description:
          "Develop core API endpoints for user management and data operations.",
        status: TaskStatus.IN_PROGRESS,
        priority: 1,
        dueDate: new Date("2024-02-10"),
        assignedAt: new Date("2024-01-25"),
        taskCost: 3000.0,
        projectId: projects[5].id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Third-party Service Integration",
        description:
          "Integrate with external services for payment processing and notifications.",
        status: TaskStatus.PENDING,
        priority: 2,
        dueDate: new Date("2024-02-20"),
        assignedAt: new Date("2024-02-05"),
        taskCost: 2000.0,
        projectId: projects[5].id,
      },
    }),
  ]);

  console.log(`✅ Created ${tasks.length} tasks`);

  console.log("🎉 Database seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   • ${clients.count} clients created`);
  console.log(`   • ${companies.count} companies created`);
  console.log(`   • ${projects.length} projects created`);
  console.log(`   • ${tasks.length} tasks created`);
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
