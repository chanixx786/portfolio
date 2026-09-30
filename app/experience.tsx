import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "SugboDoc",
    period: "5 months",
    points: [
      " Gained practical understanding of the Software Development Life Cycle (SDLC), including requirements gathering, development, testing, deployment, and maintenance.",
      "Managed tasks, sprints, and issue tracking using Jira within an Agile software development workflow.",
      "Performed QA testing to validate features, identify bugs, and support reliable software releases",
      " Integrated Figma design workflows with Git and GitHub to streamline version control and improve design-to-development handoff.",
    ],
    stack: ["Figma", "Docker", "Git", "Github", "Jira"],
  },
];

function Node({ small = false }: { small?: boolean }) {
  const outer = small ? "h-3 w-3" : "h-5 w-5";
  const inner = small ? "h-1 w-1" : "h-2 w-2";
  return (
    <span
      className={`${outer} shrink-0 rounded-full border border-foreground/60 flex items-center justify-center bg-background`}
    >
      <span className={`${inner} rounded-full bg-foreground`} />
    </span>
  );
}

export default function Experience() {
  return (
    <div className="flex w-full flex-col gap-12 text-left">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-maven-pro text-foreground">
          EXPERIENCE
        </h2>
        <p className="text-sm text-foreground/60">
          A list of my professional experience and skills.
        </p>
      </div>

      <div className="relative flex flex-col-reverse pl-8">
        <span className="absolute left-2.5 top-0 bottom-2 w-px bg-gradient-to-t from-foreground/40 to-transparent" />

        {experiences.map((exp) => (
          <div key={exp.role + exp.company} className="relative">
            {/* main node */}
            <div className="absolute -left-8 top-1">
              <Node />
            </div>

            <div className="relative overflow-hidden rounded-lg">
              <div className="relative grid md:grid-cols-[minmax(220px,1fr)_2fr]">
                {/* Column 1: role and duration */}
                <div className="flex min-h-40 flex-col">
                  <p className="text-lg font-maven-pro font-bold text-foreground">
                    {exp.role}
                  </p>

                  <p className="text-sm font-medium text-foreground/80">
                    {exp.company}
                  </p>

                  <span className="text-xs text-foreground/60">
                    {exp.period}
                  </span>

                  <div className="my-auto flex flex-wrap gap-2 pt-4">
                    {exp.stack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Column 2: description */}
                <div className="flex flex-col gap-4">
                  <ul className="flex flex-col gap-2">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-foreground/70"
                      >
                        <span className="mt-1">
                          <Node small />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
