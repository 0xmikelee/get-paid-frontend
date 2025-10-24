"use client";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createProject } from "@/data/queries";

export default function CreateProject() {
  const [state, formAction] = useActionState(createProject, null);
  return (
    <>
      <section className="container py-10">
        <h1 className="text-2xl font-bold">Create Project</h1>
        <form action={formAction}>
          <FieldSet className="py-5">
            <FieldGroup>
              <Field>
                <FieldLabel>Project Name</FieldLabel>
                <FieldDescription>
                  Enter the name of the project
                </FieldDescription>
                <FieldContent>
                  <Input type="text" name="title" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>Project Description</FieldLabel>
                <FieldDescription>
                  Enter a description for the project
                </FieldDescription>
                <FieldContent>
                  <Textarea name="description" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>Client Wallet Address</FieldLabel>
                <FieldDescription>
                  Enter the wallet address of the client
                </FieldDescription>
                <FieldContent>
                  <Input type="text" name="clientWalletAddress" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>
                  Company (Service Provider) Wallet Address
                </FieldLabel>
                <FieldDescription>
                  Enter the wallet address of the company
                </FieldDescription>
                <FieldContent>
                  <Input type="text" name="companyWalletAddress" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>Project Cost</FieldLabel>
                <FieldDescription>
                  Enter the cost of the project
                </FieldDescription>
                <FieldContent>
                  <Input type="number" name="projectCost" />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>Priority</FieldLabel>
                <FieldDescription>
                  Enter the priority of the project. 0 being the highest
                  priority.
                </FieldDescription>
                <FieldContent>
                  <Input type="number" name="priority" />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Button
            type="submit"
            className="bg-blue-400 text-white rounded-md cursor-pointer"
          >
            Create Project
          </Button>
        </form>
      </section>
    </>
  );
}
