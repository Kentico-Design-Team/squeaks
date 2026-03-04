import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="border-b px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-lg font-bold hover:underline">
            Squeaks
          </Link>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/growthxai/squeaks"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
