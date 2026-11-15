import type { Section } from "@/data/projects";

// Draws one case-study section. The `kind` field picks the layout; TypeScript
// knows which `items` shape goes with each kind, so a typo is a build error.
export function CaseStudySection({ section }: { section: Section }) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold tracking-tight text-fg">
        {section.heading}
      </h2>
      {section.intro && (
        <p className="mt-4 leading-relaxed">{section.intro}</p>
      )}
      <SectionBody section={section} />
    </section>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section.kind) {
    case "steps":
      return (
        <ol className="mt-6 space-y-2">
          {section.items.map((step, i) => (
            <li
              key={step.label}
              className="rounded-lg border border-line bg-surface px-5 py-4 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-xs leading-6 text-accent">
                {String(i + 1).padStart(2, "0")} {step.label}
              </span>
              <p className="mt-1 text-[15px] leading-relaxed text-fg/90 sm:mt-0">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      );

    case "stats":
      return (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {section.items.map((stat) => (
            // With an odd number of stats, the last card spans both columns.
            <div
              key={stat.value}
              className="rounded-lg border border-line bg-surface p-5 sm:last:odd:col-span-2"
            >
              <p className="font-mono text-2xl text-accent">{stat.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg/85">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      );

    case "bullets":
      return (
        <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-fg/90 marker:text-muted">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "lessons":
      return (
        <div className="mt-5 space-y-6">
          {section.items.map((lesson) => (
            <div key={lesson.title}>
              <h3 className="font-semibold text-fg">{lesson.title}</h3>
              <p className="mt-1 leading-relaxed">{lesson.text}</p>
            </div>
          ))}
        </div>
      );
  }
}
