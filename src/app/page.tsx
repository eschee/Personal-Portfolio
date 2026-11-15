import Link from "next/link";
import { projects } from "@/data/projects";

// Home page: a short intro, then one card per project from the data file.
// Stand-in layout in the case-study style until the home page is designed.
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[40rem] flex-1 px-6">
      <header className="py-8 font-mono text-xs text-fg">thomas.scheel</header>

      <main>
        <h1 className="mt-12 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          Thomas Scheel
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Projects I&apos;ve designed and built, with notes on how they work.
        </p>

        <h2 className="mt-16 font-mono text-xs text-muted">work</h2>
        <ul className="mt-4 space-y-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group block rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <p className="font-mono text-xs text-accent">
                  {project.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
                  {project.title}
                </h3>
                <p className="mt-2 leading-relaxed">{project.summary}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-muted">
                    {project.stack.join(" · ")}
                  </p>
                  <span className="font-mono text-xs text-fg group-hover:text-accent">
                    read case study →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="mt-24 border-t border-line py-10" />
    </div>
  );
}
