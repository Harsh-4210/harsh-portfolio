import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies, otherWork } from "@/lib/content";
import { AnimatedText, Container, OffsetCard, Reveal } from "@/components/Section";
import { Schematic } from "@/components/Visuals";
import { ArrowUpRight, GithubIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and other work by Harsh Jain.",
};

const isGithub = (href: string) => href.includes("github.com");

export default function Projects() {
  return (
    <Container className="pb-24 pt-10">
      <AnimatedText
        text="Measured, then shipped."
        className="mb-16 text-center text-5xl leading-tight sm:text-7xl lg:text-8xl"
      />

      <div className="flex flex-col gap-16 lg:gap-20">
        {caseStudies.map((p, i) => {
          const source = p.links.find((l) => isGithub(l.href));
          const extra = p.links.filter((l) => !isGithub(l.href));
          return (
            <Reveal key={p.slug}>
              <OffsetCard radius="rounded-3xl rounded-br-2xl">
                <article className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
                  <Link
                    href={`/projects/${p.slug}`}
                    className={`group block overflow-hidden rounded-2xl ${i % 2 ? "lg:order-2" : ""}`}
                    aria-label={`${p.title} case study`}
                  >
                    <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                      <Schematic steps={p.pipeline} caption={p.title} />
                    </div>
                  </Link>
                  <div>
                    <p className="text-lg font-semibold text-accent dark:text-accent-dark">{p.kind}</p>
                    <Link href={`/projects/${p.slug}`} className="hover:underline hover:underline-offset-4">
                      <h2 className="my-2 text-3xl font-bold sm:text-4xl">{p.title}</h2>
                    </Link>
                    <p className="my-3 font-medium">{p.tagline}</p>
                    <p className="mb-5 font-semibold">{p.highlight}</p>
                    <p className="mb-6 text-sm font-medium text-dark/60 dark:text-light/60">{p.stack.slice(0, 7).join(" · ")}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      {source && (
                        <a href={source.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`} className="transition-transform hover:-translate-y-0.5">
                          <GithubIcon className="h-9 w-9" />
                        </a>
                      )}
                      <Link
                        href={`/projects/${p.slug}`}
                        className="rounded-lg bg-dark px-6 py-2.5 text-lg font-semibold text-light transition-opacity hover:opacity-85 dark:bg-light dark:text-dark"
                      >
                        Case study
                      </Link>
                      {extra.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-semibold underline underline-offset-4"
                        >
                          {l.label}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </OffsetCard>
            </Reveal>
          );
        })}
      </div>

      <h2 className="mb-14 mt-32 text-center text-5xl font-bold sm:text-6xl">More work</h2>
      <div className="grid gap-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-14">
        {otherWork.map((w, i) => (
          <Reveal key={w.title} delay={(i % 2) * 0.08} className="h-full">
            <OffsetCard radius="rounded-2xl" className="h-full">
              <article className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-semibold text-accent dark:text-accent-dark">{w.tags}</span>
                  <span className="text-sm font-medium text-dark/60 dark:text-light/60">{w.year}</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold">{w.title}</h3>
                <p className="mt-2 flex-1 font-medium">{w.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-dark/60 dark:text-light/60">{w.context}</span>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${w.title} source`}
                    className="flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  >
                    {isGithub(w.href) ? <GithubIcon className="h-6 w-6" /> : "Visit"}
                    {!isGithub(w.href) && <ArrowUpRight className="h-4 w-4" />}
                  </a>
                </div>
              </article>
            </OffsetCard>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
