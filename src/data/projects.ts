// Single source of truth for portfolio projects.
// To add a project, add one object to the `projects` array below.
// The home page reads this array and renders one entry per project.

export type Project = {
  /** URL-safe unique id, e.g. "vikings-analytics". Used as the React key. */
  slug: string;
  title: string;
  /** One or two sentences shown on the home page. */
  summary: string;
  /** Technologies used, shown as small labels. */
  tags: string[];
  /** Optional link to a live demo or site. */
  liveUrl?: string;
  /** Optional link to the source code. */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "vikings-analytics",
    title: "Vikings Analytics",
    summary:
      "Minnesota Vikings–focused NFL analytics: data from nflverse loaded into Postgres, with analysis and prediction models.",
    tags: ["Python", "PostgreSQL", "nflverse"],
  },
];
