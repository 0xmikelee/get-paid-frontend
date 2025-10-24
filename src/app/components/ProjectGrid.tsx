"use client";

import { useAccount } from "wagmi";
import { useTransition, useState, useEffect, useRef } from "react";
import { getProjects } from "@/data/queries";
import { Project, ProjectStatus } from "@/app/generated/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateProjectStatus } from "@/data/queries";
import { useActionState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldSet } from "@/components/ui/field";
import Link from "next/link";

export const ProjectGrid = () => {
  const { address } = useAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [role, setRole] = useState<"client" | "company">("client");
  const [state, formAction, isPending] = useActionState(
    updateProjectStatus,
    null
  );

  const renderProjectStatus = (status: ProjectStatus) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "IN_PROGRESS":
        return "In Progress";
      case "COMPLETED":
        return "Completed";
    }
  };

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
        <div>
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
                <TableHead>Status</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="cursor-pointer">
                  <TableCell>{project.title}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {project.description}
                  </TableCell>
                  <TableCell>
                    <form action={formAction}>
                      <input
                        type="hidden"
                        name="projectId"
                        value={project.id}
                      />
                      <FieldSet>
                        <Field>
                          <Select
                            name="status"
                            disabled={
                              isPending || project.status === "COMPLETED"
                            }
                            onValueChange={(value) => {
                              // Find the closest form and submit it
                              // We'll use document.activeElement to help find the current input
                              // Actually we can use the event target to find the closest form
                              // Grab the field's form and submit immediately
                              // But since we are in a functional JSX callback, we have to do a hack:
                              setTimeout(() => {
                                const sel =
                                  document.activeElement?.closest("form");
                                if (sel)
                                  sel.requestSubmit
                                    ? sel.requestSubmit()
                                    : sel.submit();
                              }, 10);
                            }}
                            defaultValue={project.status}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={renderProjectStatus(
                                  project.status
                                )}
                              />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="IN_PROGRESS">
                                In Progress
                              </SelectItem>
                              <SelectItem value="COMPLETED">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </FieldSet>
                    </form>
                  </TableCell>
                  <TableCell>
                    <Link href={`/project/${project.id}`}>
                      <button>View</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="container py-10 text-center">
          Connect your wallet to view projects
        </div>
      )}
    </>
  );
};
