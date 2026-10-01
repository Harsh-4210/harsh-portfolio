import type { Metadata } from "next";
import Image from "next/image";
import { education, journey, profile, recognition, skills, toolkit } from "@/lib/content";
import { AnimatedText, Container, OffsetCard, Reveal } from "@/components/Section";
import { AnimatedNumber, SkillsMap, Timeline } from "@/components/Visuals";

export const metadata: Metadata = { title: "About", description: profile.bio[0] };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-14 w-full text-center text-5xl font-bold sm:text-6xl lg:mb-20 lg:text-7xl">{children}</h2>;
}

export default function About() {
  return (
    <Container className="pb-24 pt-10">
      <AnimatedText
        text="Research that ships."
        className="mb-16 text-center text-5xl leading-tight sm:text-7xl lg:text-8xl"
      />

      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-8 lg:gap-14">
        <Reveal className="flex flex-col justify-start lg:col-span-3">
          <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">Biography</h2>
          {profile.bio.map((p, i) => (
            <p key={i} className="mb-4 font-medium leading-relaxed">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-sm lg:col-span-3 lg:max-w-none">
          <OffsetCard radius="rounded-[2rem]">
            <div className="overflow-hidden rounded-[calc(2rem-2px)] p-6">
              <Image
                src="/profile.jpeg"
                alt="Portrait of Harsh Jain"
                width={960}
                height={1280}
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="aspect-[4/5] h-auto w-full rounded-2xl object-cover object-[50%_30%]"
              />
            </div>
          </OffsetCard>
        </Reveal>

        <div className="flex flex-row flex-wrap justify-around gap-8 lg:col-span-2 lg:flex-col lg:items-end lg:justify-between">
          {profile.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center lg:items-end">
              <span className="text-5xl font-bold sm:text-6xl xl:text-7xl">
                <AnimatedNumber value={s.value} decimals={s.decimals} />
                {s.suffix}
              </span>
              <span className="text-center text-base font-medium text-dark/75 dark:text-light/75 lg:text-right xl:text-lg">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-36 lg:mt-48">
        <SectionTitle>Skills</SectionTitle>
        <SkillsMap skills={skills} />
        <dl className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          {toolkit.map((t) => (
            <div key={t.area} className="rounded-2xl border-2 border-dark p-5 dark:border-light">
              <dt className="font-bold">{t.area}</dt>
              <dd className="mt-1 font-medium text-dark/75 dark:text-light/75">{t.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-36 lg:mt-48">
        <SectionTitle>Experience</SectionTitle>
        <Timeline items={journey} />
      </section>

      <section className="mt-36 lg:mt-48">
        <SectionTitle>Education</SectionTitle>
        <Timeline
          items={[
            {
              title: education.degree,
              org: education.school,
              time: `${education.period} · ${education.grade}`,
              detail: `Recognition so far: ${recognition.map((r) => `${r.title}, ${r.event} (${r.for})`).join("; ")}.`,
            },
          ]}
        />
      </section>
    </Container>
  );
}
