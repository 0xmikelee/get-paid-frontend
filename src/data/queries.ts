"use server";

import { Project } from "@/app/generated/prisma";
import prisma from "@/app/lib/prisma";
import { ProjectStatus } from "@prisma/client";

export async function getProjects(
  walletAddress: string,
  role: "client" | "company"
) {
  if (role === "client") {
    const res = await prisma.client.findMany({
      where: {
        walletAddress,
      },
      include: {
        projects: true,
      },
    });
    if (res) {
      return res[0].projects || null;
    }
  }
  if (role === "company") {
    const res = await prisma.company.findMany({
      where: {
        walletAddress,
      },
      include: {
        projects: true,
      },
    });
    if (res) {
      return res[0].projects || null;
    }
  }
  return [];
}

export async function createProject(prevState: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const status = "PENDING";
  const priority = parseInt(formData.get("priority") as string) || 0;
  const projectCost = parseInt(formData.get("projectCost") as string);
  const companyWalletAddress = formData.get("companyWalletAddress") as string;
  const clientWalletAddress = formData.get("clientWalletAddress") as string;
  const vaultAddress = "testValue";

  try {
    // Find company and client by wallet addresses
    const company = await prisma.company.findUnique({
      where: { walletAddress: companyWalletAddress },
    });

    const client = await prisma.client.findUnique({
      where: { walletAddress: clientWalletAddress },
    });

    if (!company || !client) {
      throw new Error("Company or client not found");
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        status,
        priority,
        projectCost,
        vaultAddress,
        companyId: company.id,
        clientId: client.id,
      },
    });

    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function createClient(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = "1234";
  const walletAddress = formData.get("walletAddress") as string;

  try {
    const client = await prisma.client.create({
      data: { email, password, walletAddress },
    });
    return client.id;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}

export async function createCompany(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = "12345";
  const walletAddress = formData.get("walletAddress") as string;

  try {
    const company = await prisma.company.create({
      data: { email, password, walletAddress },
    });
    return company.id;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}
