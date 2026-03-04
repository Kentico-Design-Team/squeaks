import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-8">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Squeaks</h1>
        <p className="text-lg">
          A lightweight Shadcn theme for copy-first prototyping with Claude
          Code. Black and white, no polish, information first. Describe a page,
          click through it, iterate.
        </p>
        <Card>
          <CardContent className="space-y-2 pt-4">
            <p className="font-mono text-sm">
              git clone https://github.com/growthxai/squeaks.git my-prototype
            </p>
            <p className="font-mono text-sm">cd my-prototype && yarn install</p>
            <p className="font-mono text-sm">yarn dev</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Why */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Why</h2>
        <p>
          Whiteboard sketches can't be clicked. Figma looks finished before the
          thinking is finished. Vibe-coding skips the thinking entirely.
        </p>
        <p>
          This sits in the middle — navigable pages with real words on them that
          still look like sketches. Focus stays on what the page says, what the
          user can do, and what happens next. Not on colors.
        </p>
      </div>

      <Separator />

      {/* What's in the box */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What's included</h2>
        <p>
          Vite + React + TypeScript + Tailwind + React Router. All Shadcn UI
          components pre-installed. Monochrome theme with thick borders and a
          hand-drawn font. No backend, no database, no API calls.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. Describe</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Tell Claude what you want. Plain text, ASCII wireframe,
              screenshot.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. Generate</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Claude builds the page, wires up routes, adds placeholder data.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">3. Iterate</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              "Move this above that." "Make a /v2 with a sidebar." Compare and
              pick.
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Example */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Example output</h2>
          <p className="text-muted-foreground">
            Generated from: "Create a project dashboard with stat cards and a
            recent activity table."
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Acme Corp Dashboard</CardTitle>
              <Button variant="outline" size="sm">
                + New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Active Projects", value: "12" },
                { label: "Team Members", value: "8" },
                { label: "Tasks Due This Week", value: "23" },
                { label: "Completion Rate", value: "87%" },
              ].map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="mb-2 text-sm font-bold">Recent Activity</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Person</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      project: "Mobile App Redesign",
                      action: "Completed user research",
                      person: "Sarah Chen",
                      date: "Mar 3",
                    },
                    {
                      project: "API Migration",
                      action: "Deployed to staging",
                      person: "James Okoro",
                      date: "Mar 2",
                    },
                    {
                      project: "Onboarding Flow",
                      action: "Added step 3 wireframe",
                      person: "Maria Lopez",
                      date: "Mar 2",
                    },
                    {
                      project: "Settings Page",
                      action: "Reviewed with team",
                      person: "Alex Kim",
                      date: "Mar 1",
                    },
                    {
                      project: "Mobile App Redesign",
                      action: "Created /v2 prototype",
                      person: "Sarah Chen",
                      date: "Feb 28",
                    },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {row.project}
                      </TableCell>
                      <TableCell>{row.action}</TableCell>
                      <TableCell>{row.person}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
