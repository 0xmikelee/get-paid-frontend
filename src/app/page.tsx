import Link from "next/link";
import { ProjectGrid } from "./components/ProjectGrid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section className="container py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem asChild>
                <Link href="/create-project/">Create Project</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/create-company/">Create Company</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/create-client/">Create Client</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ProjectGrid />
      </section>
    </>
  );
}
