import { projects } from "@/data/projects";

// Placeholder home page. The real design comes next; for now it just proves
// that the page reads from src/data/projects.ts.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Site under construction.
      </p>

      <h2 className="mt-12 text-xl font-medium">Projects</h2>
      <ul className="mt-4 space-y-6">
        {projects.map((project) => (
          <li key={project.slug}>
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{project.summary}</p>
            <p className="mt-1 text-sm text-zinc-500">
              {project.tags.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
