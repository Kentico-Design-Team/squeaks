import { Shell } from "@/templates/shell";

export default function Home() {
  return (
    <Shell
      breadcrumbs={[
        { label: "Category 1" },
        { label: "Category 2" },
        { label: "Category 3" },
      ]}
      status="Draft"
      activeNav="content"
    >
      <div className="mx-auto max-w-3xl space-y-4 py-6">
        <h1 className="text-3xl font-bold">Shell template</h1>
        <p>
          Tato stránka používá <code>@/templates/shell</code>. Edituj{" "}
          <code>src/templates/shell.tsx</code> a změna se propíše do všech
          stránek, které šablonu používají.
        </p>
        <p>
          Pro vlastní stránku jen obal obsah do{" "}
          <code>&lt;Shell breadcrumbs={"{[...]}"} actions={"{...}"}&gt;</code>.
        </p>
      </div>
    </Shell>
  );
}
