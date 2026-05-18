// About content is embedded inside app/page.tsx (home page bento grid).
// This file redirects to home if someone navigates to /about directly.
import { redirect } from "next/navigation";
export default function AboutPage() {
  redirect("/#about");
}
