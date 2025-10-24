"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../src/app/generated/prisma");
var bcryptjs_1 = require("bcryptjs");
var prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, clientWalletAddresses, companyWalletAddresses, projectVaultAddresses, clients, companies, createdClients, createdCompanies, projects, tasks;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    console.log("🌱 Starting database seeding...");
                    // Clean existing data (in reverse order of dependencies)
                    return [4 /*yield*/, prisma.task.deleteMany()];
                case 1:
                    // Clean existing data (in reverse order of dependencies)
                    _0.sent();
                    return [4 /*yield*/, prisma.project.deleteMany()];
                case 2:
                    _0.sent();
                    return [4 /*yield*/, prisma.client.deleteMany()];
                case 3:
                    _0.sent();
                    return [4 /*yield*/, prisma.company.deleteMany()];
                case 4:
                    _0.sent();
                    console.log("🗑️  Cleaned existing data");
                    return [4 /*yield*/, bcryptjs_1.default.hash("password123", 10)];
                case 5:
                    hashedPassword = _0.sent();
                    clientWalletAddresses = [
                        "0x6b34Bd29078b5795f82122F06b1b1636AE8e0025",
                        "0x1000000000000000000000000000000000000002",
                        "0x1000000000000000000000000000000000000003",
                        "0x1000000000000000000000000000000000000004",
                    ];
                    companyWalletAddresses = [
                        "0x6b34Bd29078b5795f82122F06b1b1636AE8e0025",
                        "0x2000000000000000000000000000000000000002",
                        "0x2000000000000000000000000000000000000003",
                    ];
                    projectVaultAddresses = [
                        "0x3000000000000000000000000000000000000001",
                        "0x3000000000000000000000000000000000000002",
                        "0x3000000000000000000000000000000000000003",
                        "0x3000000000000000000000000000000000000004",
                        "0x3000000000000000000000000000000000000005",
                        "0x3000000000000000000000000000000000000006",
                    ];
                    return [4 /*yield*/, prisma.client.createMany({
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
                        })];
                case 6:
                    clients = _0.sent();
                    console.log("\uD83D\uDC65 Created ".concat(clients.count, " clients"));
                    return [4 /*yield*/, prisma.company.createMany({
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
                        })];
                case 7:
                    companies = _0.sent();
                    console.log("\uD83C\uDFE2 Created ".concat(companies.count, " companies"));
                    return [4 /*yield*/, prisma.client.findMany()];
                case 8:
                    createdClients = _0.sent();
                    return [4 /*yield*/, prisma.company.findMany()];
                case 9:
                    createdCompanies = _0.sent();
                    // Ensure we have enough records for relationships
                    if (createdClients.length < 4 || createdCompanies.length < 3) {
                        throw new Error("Not enough clients or companies created for seeding");
                    }
                    return [4 /*yield*/, Promise.all([
                            prisma.project.create({
                                data: {
                                    title: "E-commerce Website Development",
                                    description: "Build a modern e-commerce platform with payment integration, inventory management, and user authentication.",
                                    status: prisma_1.ProjectStatus.IN_PROGRESS,
                                    priority: 1,
                                    projectCost: 15000.0,
                                    vaultAddress: projectVaultAddresses[0],
                                    companyId: (_b = (_a = createdCompanies[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0,
                                    clientId: (_d = (_c = createdClients[0]) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : 0,
                                },
                            }),
                            prisma.project.create({
                                data: {
                                    title: "Mobile App UI/UX Design",
                                    description: "Design a comprehensive UI/UX for a fitness tracking mobile application.",
                                    status: prisma_1.ProjectStatus.PENDING,
                                    priority: 2,
                                    projectCost: 8500.0,
                                    vaultAddress: projectVaultAddresses[1],
                                    companyId: (_f = (_e = createdCompanies[1]) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : 0,
                                    clientId: (_h = (_g = createdClients[1]) === null || _g === void 0 ? void 0 : _g.id) !== null && _h !== void 0 ? _h : 0,
                                },
                            }),
                            prisma.project.create({
                                data: {
                                    title: "Corporate Website Redesign",
                                    description: "Complete redesign of corporate website with modern design principles and improved user experience.",
                                    status: prisma_1.ProjectStatus.COMPLETED,
                                    priority: 3,
                                    projectCost: 12000.0,
                                    vaultAddress: projectVaultAddresses[2],
                                    companyId: (_k = (_j = createdCompanies[2]) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : 0,
                                    clientId: (_m = (_l = createdClients[2]) === null || _l === void 0 ? void 0 : _l.id) !== null && _m !== void 0 ? _m : 0,
                                },
                            }),
                            prisma.project.create({
                                data: {
                                    title: "Database Migration Project",
                                    description: "Migrate legacy database to modern cloud infrastructure with zero downtime.",
                                    status: prisma_1.ProjectStatus.IN_PROGRESS,
                                    priority: 1,
                                    projectCost: 20000.0,
                                    vaultAddress: projectVaultAddresses[3],
                                    companyId: (_p = (_o = createdCompanies[0]) === null || _o === void 0 ? void 0 : _o.id) !== null && _p !== void 0 ? _p : 0,
                                    clientId: (_r = (_q = createdClients[3]) === null || _q === void 0 ? void 0 : _q.id) !== null && _r !== void 0 ? _r : 0,
                                },
                            }),
                            prisma.project.create({
                                data: {
                                    title: "Brand Identity Package",
                                    description: "Create complete brand identity including logo, color palette, typography, and brand guidelines.",
                                    status: prisma_1.ProjectStatus.PENDING,
                                    priority: 2,
                                    projectCost: 5000.0,
                                    vaultAddress: projectVaultAddresses[4],
                                    companyId: (_t = (_s = createdCompanies[1]) === null || _s === void 0 ? void 0 : _s.id) !== null && _t !== void 0 ? _t : 0,
                                    clientId: (_v = (_u = createdClients[0]) === null || _u === void 0 ? void 0 : _u.id) !== null && _v !== void 0 ? _v : 0,
                                },
                            }),
                            prisma.project.create({
                                data: {
                                    title: "API Development & Integration",
                                    description: "Develop RESTful APIs and integrate with third-party services for data synchronization.",
                                    status: prisma_1.ProjectStatus.IN_PROGRESS,
                                    priority: 1,
                                    projectCost: 18000.0,
                                    vaultAddress: projectVaultAddresses[5],
                                    companyId: (_x = (_w = createdCompanies[2]) === null || _w === void 0 ? void 0 : _w.id) !== null && _x !== void 0 ? _x : 0,
                                    clientId: (_z = (_y = createdClients[1]) === null || _y === void 0 ? void 0 : _y.id) !== null && _z !== void 0 ? _z : 0,
                                },
                            }),
                        ])];
                case 10:
                    projects = _0.sent();
                    console.log("\uD83D\uDCCB Created ".concat(projects.length, " projects"));
                    return [4 /*yield*/, Promise.all([
                            // Tasks for E-commerce Website Development
                            prisma.task.create({
                                data: {
                                    title: "Setup Development Environment",
                                    description: "Configure development environment, install dependencies, and setup version control.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Build secure user registration, login, and password reset functionality.",
                                    status: prisma_1.TaskStatus.IN_PROGRESS,
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
                                    description: "Integrate Stripe payment gateway for secure online transactions.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    description: "Build product catalog with categories, search, and filtering capabilities.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    description: "Conduct user research and create detailed user personas for the fitness app.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Create detailed wireframes and interactive prototypes for all app screens.",
                                    status: prisma_1.TaskStatus.IN_PROGRESS,
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
                                    description: "Create comprehensive visual design system with colors, typography, and components.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Create comprehensive design system with components and guidelines.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Implement responsive frontend using modern web technologies.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Analyze current database structure and plan migration strategy.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    status: prisma_1.TaskStatus.IN_PROGRESS,
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
                                    description: "Develop automated migration scripts for data transformation.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    description: "Conduct brand discovery workshop to understand company values and vision.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    description: "Create comprehensive brand guidelines document with usage examples.",
                                    status: prisma_1.TaskStatus.PENDING,
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
                                    description: "Design RESTful API architecture with proper endpoints and data models.",
                                    status: prisma_1.TaskStatus.COMPLETED,
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
                                    description: "Develop core API endpoints for user management and data operations.",
                                    status: prisma_1.TaskStatus.IN_PROGRESS,
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
                                    description: "Integrate with external services for payment processing and notifications.",
                                    status: prisma_1.TaskStatus.PENDING,
                                    priority: 2,
                                    dueDate: new Date("2024-02-20"),
                                    assignedAt: new Date("2024-02-05"),
                                    taskCost: 2000.0,
                                    projectId: projects[5].id,
                                },
                            }),
                        ])];
                case 11:
                    tasks = _0.sent();
                    console.log("\u2705 Created ".concat(tasks.length, " tasks"));
                    console.log("🎉 Database seeding completed successfully!");
                    console.log("\n📊 Summary:");
                    console.log("   \u2022 ".concat(clients.count, " clients created"));
                    console.log("   \u2022 ".concat(companies.count, " companies created"));
                    console.log("   \u2022 ".concat(projects.length, " projects created"));
                    console.log("   \u2022 ".concat(tasks.length, " tasks created"));
                    console.log("\n💰 Project Costs:");
                    projects.forEach(function (project, index) {
                        console.log("   \u2022 ".concat(project.title, ": $").concat(project.projectCost.toLocaleString()));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
