import StatusBadge from "@/components/StatusBadge";

const sections = [
  {
    key: "critical",
    title: "Critical Issues",
    empty: "No critical issues in this demo report.",
  },
  {
    key: "important",
    title: "Important Issues",
    empty: "No important issues in this demo report.",
  },
  {
    key: "warnings",
    title: "Warnings",
    empty: "No warnings in this demo report.",
  },
  {
    key: "passed",
    title: "Passed Checks",
    empty: "No passed checks recorded yet.",
  },
];

export default function AuditIssues({ issues }) {
  const data = issues || {
    critical: [],
    important: [],
    warnings: [],
    passed: [],
  };

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-white">Issues Found</h3>
        <p className="mt-1 text-sm text-muted">
          Demo findings only — not a live crawl of the website.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {sections.map((section) => {
          const items = data[section.key] || [];

          return (
            <article
              key={section.key}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-semibold text-white">{section.title}</h4>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted">
                  {items.length}
                </span>
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-muted">{section.empty}</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((issue) => (
                    <li
                      key={issue.id}
                      className="rounded-lg border border-border/80 bg-background/60 p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="font-medium text-white">{issue.title}</p>
                        <StatusBadge status={issue.severity} />
                      </div>
                      <p className="mt-1.5 text-sm text-muted">
                        {issue.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
