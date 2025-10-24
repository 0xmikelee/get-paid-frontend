"use client";
import { createClient } from "@/data/queries";
import { useActionState } from "react";
import { useAccount } from "wagmi";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateClient() {
  const [state, formAction] = useActionState(createClient, null);
  const { address } = useAccount();
  return (
    <form action={formAction} className="container py-10">
      <h1 className="text-2xl font-bold">Create Client</h1>
      <FieldSet className="py-5">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldDescription>Enter the email of the client</FieldDescription>
            <FieldContent>
              <Input type="email" name="email" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Wallet Address</FieldLabel>
            <FieldDescription>
              Link your wallet address to the company. You will be able to
              create projects and manage them.
            </FieldDescription>
            <FieldContent>
              <Input
                readOnly
                type="text"
                name="walletAddress"
                value={address ?? ""}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <Button
        className="bg-blue-400 text-white rounded-md cursor-pointer"
        type="submit"
      >
        Create Client
      </Button>
    </form>
  );
}
