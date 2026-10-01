import Image from "next/image";
import { profile } from "@/lib/content";
import { AnimatedText, Container, OffsetCard } from "@/components/Section";
import { CircularBadge } from "@/components/Visuals";
import { ArrowUpRight } from "@/components/Icons";

export default function Home() {
  return (
    <Container className="flex min-h-[calc(100vh-7rem)] items-center pb-16 pt-2 lg:pb-24 lg:pt-6">
      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="w-full max-w-[14rem] sm:max-w-xs lg:w-[42%] lg:max-w-none">
          <OffsetCard radius="rounded-[2rem]">
            <div className="overflow-hidden rounded-[calc(2rem-2px)]">
              <Image
                src="/profile.jpeg"
                alt="Portrait of Harsh Jain"
                width={960}
                height={1280}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="aspect-[4/5] h-auto w-full object-cover object-[50%_30%]"
              />
            </div>
          </OffsetCard>
        </div>

        <div className="flex w-full flex-col items-center text-center lg:w-[58%] lg:items-start lg:text-left">
          <p className="mb-4 font-semibold uppercase tracking-[0.18em] text-accent dark:text-accent-dark">
            {profile.name} · {profile.role}
          </p>
          <AnimatedText
            text={profile.headline}
            className="text-4xl leading-[1.1] sm:text-5xl xl:text-6xl"
          />
          <p className="my-6 max-w-2xl text-base font-medium sm:text-lg">
            {profile.intro} {profile.focus}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border-2 border-dark bg-dark px-6 py-2.5 text-lg font-semibold text-light transition-colors hover:bg-light hover:text-dark dark:border-light dark:bg-light dark:text-dark dark:hover:bg-dark dark:hover:text-light"
            >
              Résumé <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} className="text-lg font-medium underline underline-offset-4">
              Contact
            </a>
          </div>
          <p className="mt-6 text-sm font-medium text-dark/60 dark:text-light/60">{profile.availability}</p>
        </div>
      </div>
      <CircularBadge />
    </Container>
  );
}
