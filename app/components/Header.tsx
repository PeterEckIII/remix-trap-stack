import { Form, Link } from "@remix-run/react";
import { Apple, Menu, MenuIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 mx:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="/">
          <Apple className="size-5" />
          <span className="sr-only">Company Name</span>
        </Link>
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/">
              <Apple className="size-5" />
              <span className="sr-only">Home</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <MenuIcon className="size-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuLabel>Support</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Form action="/logout" method="post">
                <Button variant="destructive" type="submit">
                  Logout
                </Button>
              </Form>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
