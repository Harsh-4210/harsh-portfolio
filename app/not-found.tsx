import Link from "next/link";
import { Container } from "@/components/Section";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-8xl font-bold">404</p>
      <p className="mt-4 text-xl font-medium">This page does not exist.</p>
      <Link href="/" className="mt-8 rounded-lg bg-dark px-6 py-2.5 font-semibold text-light dark:bg-light dark:text-dark">
        Back home
      </Link>
    </Container>
  );
}
