"use server";

import prisma from "@/app/lib/prisma";

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
      return res[0].projects;
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
      return res[0].projects;
    }
  }
  return [];
}
