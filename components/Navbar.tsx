import { SITE } from "@/lib/data";
import ThemeSwitcher from "./ThemeSwitcher";

// Section ids Sections.tsx ke andar wale ids se match hone chahiye
const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Ask AI", href: "#ask-ai" },
  { label: "Contact", href: "#contact" },
];

// Server component — fixed top bar. Gradient isliye ki desk image ke upar text hamesha readable rahe.
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <a href="#" className="text-base font-semibold tracking-tight md:text-lg">
          Shiva <span className="text-cyan-400">Saini</span>
        </a>

        <div className="flex items-center gap-8">
          {/* Mobile pe links hide — wahan sirf Resume button dikhega */}
          <ul className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-white focus-visible:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(34,211,238,0.45)] transition-colors hover:bg-cyan-300"
            >
              Free demo
            </a>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:border-cyan-400 hover:bg-cyan-400 hover:text-black sm:inline-block"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
