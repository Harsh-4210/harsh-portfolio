import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/content";
import { AnimatedText, Container, OffsetCard, Reveal } from "@/components/Section";
import { Schematic } from "@/components/Visuals";
import { ArrowUpRight } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((c) => c.slug === slug);
  return p ? { title: p.title, description: p.tagline } : {};
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="mt-20">
      <h2 className="mb-6 text-3xl font-bold sm:text-4xl">{title}</h2>
      {children}
    </Reveal>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const p = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <Container className="pb-24 pt-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/projects" className="font-semibold underline underline-offset-4">
          ← All projects
        </Link>

        <p className="mt-12 text-lg font-semibold text-accent dark:text-accent-dark">{p.kind}</p>
        <AnimatedText text={p.title} className="mt-2 break-words text-4xl leading-tight sm:text-6xl lg:text-7xl" />
        <p className="mt-5 max-w-3xl text-lg font-medium sm:text-xl">{p.tagline}</p>

        <Reveal className="mt-12">
          <OffsetCard radius="rounded-3xl">
            <div className="overflow-hidden rounded-[calc(1.5rem-2px)]">
              <Schematic steps={p.pipeline} caption="How it works" />
            </div>
          </OffsetCard>
        </Reveal>

        <dl className="mt-14 grid gap-x-8 gap-y-4 border-y-2 border-dark py-6 font-medium dark:border-light sm:grid-cols-[7rem_1fr]">
          <dt className="font-bold">Year</dt>
          <dd>{p.year}</dd>
          <dt className="font-bold">Role</dt>
          <dd>{p.role}</dd>
          <dt className="font-bold">Stack</dt>
          <dd>{p.stack.join(", ")}</dd>
          <dt className="font-bold">Links</dt>
          <dd className="flex flex-wrap gap-x-5 gap-y-2">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 underline underline-offset-4"
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </dd>
        </dl>

        <Block title="Problem">
          <p className="max-w-3xl text-lg font-medium leading-relaxed">{p.problem}</p>
        </Block>

        <Block title="Approach">
          <ol className="space-y-6">
            {p.approach.map((a, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-2">
                <span className="text-2xl font-bold text-dark/30 dark:text-light/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium leading-relaxed">{a}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block title="Result">
          <p className="max-w-3xl text-lg font-semibold leading-relaxed">{p.result}</p>
          {p.metrics && (
            <figure className="mt-8">
              <div className="overflow-x-auto rounded-2xl border-2 border-dark dark:border-light">
                <table className="w-full text-left text-sm font-medium tabular-nums sm:text-base">
                  <thead className="bg-dark text-light dark:bg-light dark:text-dark">
                    <tr>
                      <th className="px-2.5 py-3 sm:px-4 font-semibold">Rubric</th>
                      {p.metrics.columns.map((c) => (
                        <th key={c} className="px-2.5 py-3 sm:px-4 text-right font-semibold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.metrics.rows.map((r, i) => (
                      <tr key={r.label} className="border-t border-dark/15 dark:border-light/15">
                        <td className={`px-2.5 py-3 sm:px-4 ${i === 0 ? "font-bold" : ""}`}>{r.label}</td>
                        <td className="px-2.5 py-3 sm:px-4 text-right text-dark/60 dark:text-light/60">{r.start}</td>
                        <td className="px-2.5 py-3 sm:px-4 text-right font-bold">{r.best}</td>
                        <td className="px-2.5 py-3 sm:px-4 text-right text-dark/60 dark:text-light/60">{r.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <figcaption className="mt-3 text-sm font-medium text-dark/60 dark:text-light/60">
                {p.metrics.caption}
              </figcaption>
            </figure>
          )}
        </Block>

        <Block title="Limitations">
          <ul className="list-disc space-y-3 pl-6 font-medium leading-relaxed marker:text-dark/40 dark:marker:text-light/40">
            {p.limitations.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Block>

        {p.next && (
          <Block title="What I would do next">
            <ul className="list-disc space-y-3 pl-6 font-medium leading-relaxed marker:text-dark/40 dark:marker:text-light/40">
              {p.next.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </Block>
        )}

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-24 flex items-center justify-between rounded-2xl border-2 border-dark p-6 transition-colors hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
        >
          <span>
            <span className="block text-sm font-semibold uppercase tracking-widest opacity-60">Next project</span>
            <span className="text-2xl font-bold sm:text-3xl">{next.title}</span>
          </span>
          <span aria-hidden className="text-3xl transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Container>
  );
}
