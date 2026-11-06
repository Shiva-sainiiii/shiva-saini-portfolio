import { SITE } from "@/lib/data";
import MobileMenu from "./MobileMenu";
import Fx from "./Fx";

// Section ids Sections.tsx ke andar wale ids se match hone chahiye
const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Ask AI", href: "#ask-ai" },
  { label: "Contact", href: "#contact" },
];

// Server component — fixed top bar. mix-blend-difference: dark aur bone dono sections pe readable rehta hai.
// Logo z-20, right wala wrapper z-10: mobile menu panel (-z-10, wrapper ke andar) in dono ke NEECHE rehta hai.
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <a href="#top" className="relative z-20 mix-blend-difference font-display text-lg font-extrabold uppercase tracking-tight text-ink md:text-xl">
          <Fx>Shiva Saini</Fx>
        </a>

        <div className="relative z-10 flex items-center gap-8">
          <ul className="hidden items-center gap-7 mix-blend-difference text-sm font-medium text-ink md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-accent2 focus-visible:text-accent2"><Fx>{n.label}</Fx></a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full bg-accent2 px-4 py-2 text-sm font-bold text-black transition hover:brightness-110">
              <Fx tone="text-black">Free demo</Fx>
            </a>
            <MobileMenu links={NAV} resume={SITE.resume} demo={SITE.whatsappUrl} />
          </div>
        </div>
      </nav>
    </header>
  );
}
