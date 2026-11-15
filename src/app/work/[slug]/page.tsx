import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudySection } from "@/components/case-study-sections";
import { getProject, projects } from "@/data/projects";

// Every real case study is prerendered by generateStaticParams, so it is
// already instant. Only unknown slugs reach the server, and those must block
// so notFound() can send a real 404 status. A <Suspense> fallback would stream
// a "200 OK" first and turn bad URLs into soft 404s.
export const instant = false;

// Prerender one static page per project in the data file at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  // Only slugs in the data file are valid; anything else is a real 404.
  if (!project) notFound();

  // "next:" points to the following project, wrapping around to the first.
  // With a single project there is nothing to point to, so it is hidden.
  const index = projects.indexOf(project);
  const next =
    projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  return (
    <div className="mx-auto w-full max-w-[40rem] flex-1 px-6">
      <header className="flex items-center justify-between py-8 font-mono text-xs">
        <Link href="/" className="text-muted transition-colors hover:text-fg">
          ← all work
        </Link>
        <Link href="/" className="text-fg">
          thomas.scheel
        </Link>
      </header>

      <main>
        <p className="mt-12 font-mono text-xs text-accent">
          case study · {project.category}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-fg sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed">{project.intro}</p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          <Meta label="role" value={project.role} />
          <Meta label="timeline" value={project.timeline} />
          <Meta label="stack" value={project.stack.join(" · ")} />
        </dl>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                Live site ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-surface"
              >
                Code on GitHub ↗
              </a>
            )}
          </div>
        )}

        {project.screenshots && (
          <figure className="mt-16">
            <div className="flex items-end gap-3 rounded-xl border border-line bg-surface p-4 sm:p-6">
              {project.screenshots.shots.map((shot) => (
                // flex-grow = the image's aspect ratio, so every screenshot
                // in the row ends up the same height whatever its shape.
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 640px) 480px, 80vw"
                  style={{ flexGrow: shot.width / shot.height }}
                  className="h-auto w-0 rounded-md border border-line"
                />
              ))}
            </div>
            <figcaption className="mt-3 text-xs text-muted">
              {project.screenshots.caption}
            </figcaption>
          </figure>
        )}

        {project.sections.map((section) => (
          <CaseStudySection key={section.heading} section={section} />
        ))}
      </main>

      <footer className="mt-24 flex items-center justify-between border-t border-line py-10 font-mono text-xs">
        <Link href="/" className="text-muted transition-colors hover:text-fg">
          ← all work
        </Link>
        {next && (
          <Link href={`/work/${next.slug}`} className="text-accent">
            next: {next.title} →
          </Link>
        )}
      </footer>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
    </div>
  );
}
