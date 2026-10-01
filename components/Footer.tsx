import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="w-full border-t-2 border-dark font-medium dark:border-light">
      <div className="flex flex-col items-center justify-between gap-3 px-6 py-8 text-center sm:px-12 lg:flex-row lg:px-24 xl:px-32">
        <span>{new Date().getFullYear()} © {profile.name}</span>
        <span className="text-dark/70 dark:text-light/70">
          Built with Next.js ·{" "}
          <a
            href="https://github.com/Harsh-4210/harsh-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            source
          </a>
        </span>
        <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
          Say hello
        </a>
      </div>
    </footer>
  );
}
