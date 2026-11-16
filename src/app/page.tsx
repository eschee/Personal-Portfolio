import Image from "next/image";
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
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/40"
              >
                {project.cover && (
                  // Fixed 16:9 box; object-top keeps the top of the
                  // screenshot in view and crops the bottom.
                  <div className="aspect-video overflow-hidden border-b border-line">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={project.cover.width}
                      height={project.cover.height}
                      sizes="(min-width: 640px) 592px, 100vw"
                      // The first card is visible on arrival, so load its
                      // image right away; later ones load as you scroll.
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="p-6">
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
