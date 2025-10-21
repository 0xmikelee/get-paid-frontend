"use client";

import { useAccount } from "wagmi";
import { useTransition, useState, useEffect, useRef } from "react";
import { getProjects } from "@/data/queries";
import { Project } from "@/app/generated/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProjectGrid = () => {
  const { address } = useAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [role, setRole] = useState<"client" | "company">("client");

  useEffect(() => {
    if (!address) return;
    const getAddress = async () => {
      const res = await getProjects(address?.toString() ?? "", role);
      if (res.length > 0) {
        setProjects(res);
      }
    };
    getAddress();
  }, [address, role]);
  return (
    <>
      {address ? (
        <div className="container py-10">
          <label htmlFor="role">
            <b>Role:</b>
          </label>
          <select
            onChange={(e) => setRole(e.target.value as "client" | "company")}
            id="role"
          >
            <option value="client">Client</option>
            <option value="company">Company</option>
          </select>
          <Table className="max-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div>Connect your wallet to view projects</div>
      )}
    </>
  );
};
