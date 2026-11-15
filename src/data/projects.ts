// Single source of truth for portfolio projects.
//
// To add a project, add one object to the `projects` array at the bottom.
// The home page lists every project, and each one gets a case-study page at
// /work/<slug>. Projects appear in array order, and each case study's
// "next:" link points to the project after it.

/** One labelled row, e.g. "01 data — Schedules, results and ...". */
export type Step = { label: string; text: string };

/** A big number with a sentence explaining it. */
export type Stat = { value: string; text: string };

/** A short bold heading with a paragraph under it. */
export type Lesson = { title: string; text: string };

/**
 * A case study is a list of sections. Each section has a `kind` that decides
 * how it is drawn, so a project can use any mix of them in any order.
 */
export type Section =
  | { kind: "steps"; heading: string; intro?: string; items: Step[] }
  | { kind: "stats"; heading: string; intro?: string; items: Stat[] }
  | { kind: "bullets"; heading: string; intro?: string; items: string[] }
  | { kind: "lessons"; heading: string; intro?: string; items: Lesson[] };

/** A screenshot in /public. width/height are the file's pixel size. */
export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  /** URL-safe unique id; the page lives at /work/<slug>. Lowercase, dashes. */
  slug: string;
  title: string;
  /** Small green label above the title, e.g. "nfl analytics". */
  category: string;
  /** One sentence for the home page card. */
  summary: string;
  /** The paragraph under the title on the case-study page. */
  intro: string;
  role: string;
  timeline: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Screenshots shown side by side under the header, wide one first. */
  screenshots?: { shots: Shot[]; caption: string };
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: "hatewatch",
    title: "Hatewatch",
    category: "nfl analytics",
    summary:
      "Ranks every NFL game by how much it moves the Vikings' playoff chances, using 100,000 simulated seasons.",
    intro:
      "Every NFL Sunday, fans ask the same question: which other games should I care about? Hatewatch answers it with math instead of guesswork, ranking every game by how much it moves the Vikings' playoff chances.",
    role: "Solo: product, data, build",
    timeline: "November 2026",
    stack: ["Python", "Postgres", "Next.js", "Vercel"],
    liveUrl: "https://vikings-analytics.vercel.app",
    repoUrl: "https://github.com/eschee/vikings-analytics",
    screenshots: {
      shots: [
        {
          src: "/projects/hatewatch/desktop.png",
          alt: "Hatewatch on desktop: the Vikings' 72% playoff chance above their own game and a ranked list of other games to root for.",
          width: 2880,
          height: 1800,
        },
        {
          src: "/projects/hatewatch/phone.png",
          alt: "Hatewatch on a phone: the same guide stacked in a single column.",
          width: 780,
          height: 1688,
        },
      ],
      caption: "The guide ranks this week's games by impact, with details on tap.",
    },
    sections: [
      {
        kind: "steps",
        heading: "How it works",
        items: [
          {
            label: "data",
            text: "Schedules, results and betting lines come from nflverse, the open NFL data project.",
          },
          {
            label: "ratings",
            text: "Vegas lines price each game. For games without a line yet, team ratings fitted from this season's spreads fill the gap, with extra uncertainty for weeks further out.",
          },
          {
            label: "simulate",
            text: "The rest of the season is played out 100,000 times with the NFL's real tiebreaker rules. A game's impact is the difference in the Vikings' odds between the seasons where each team wins it.",
          },
          {
            label: "ship",
            text: "A GitHub Action reruns everything Monday, Tuesday and Friday, writes results to a Neon Postgres database, and redeploys the Next.js site on Vercel.",
          },
        ],
      },
      {
        kind: "stats",
        heading: "Proving it's right",
        intro:
          "A model that gives confident answers is easy to build. The work was in checking those answers against things I already knew to be true.",
        items: [
          {
            value: "8 / 8",
            text: "Tiebreaker code reproduced the real playoff seeds for both conferences in every season from 2022 to 2025.",
          },
          {
            value: "0.000",
            text: "Forcing each result and re-simulating matched the fast method within noise. A control game that can't affect the Vikings moved their odds by exactly zero.",
          },
          {
            value: "1.3 pts",
            text: "The measured noise floor. Games below it are labeled \"doesn't matter\" instead of pretending to be precise.",
          },
        ],
      },
      {
        kind: "bullets",
        heading: "Built to be safe",
        items: [
          "The website connects with a read-only database role; only the refresh job can write, and it can't change tables or delete history.",
          "Secrets live only in Vercel and GitHub's secret stores, never in the code.",
          "Every change went through a pull request and a security review before merging.",
          "Team pages accept only the 32 real team codes; anything else is a proper 404.",
        ],
      },
      {
        kind: "lessons",
        heading: "What I learned",
        items: [
          {
            title: "Check the outputs, not just the errors",
            text: "An early version read betting lines backwards. Nothing crashed. The only clue was that favorites were \"winning\" 32% of the time, which can't be right.",
          },
          {
            title: "Noise looks like signal until you measure it",
            text: "A division rival's game kept flipping between \"root hard\" and \"doesn't matter.\" Its real effect sat right on the noise floor, so I measured the floor and ran five times more simulations.",
          },
          // Third lesson goes here once written.
        ],
      },
    ],
  },
];

/** Look up a project by its slug; undefined if there is no such project. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
