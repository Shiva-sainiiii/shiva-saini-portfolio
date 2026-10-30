import { SITE } from "@/lib/data";
import MobileMenu from "./MobileMenu";
import Fx from "./Fx";
import ThemeSwitcher from "./ThemeSwitcher";

// Section ids Sections.tsx ke andar wale ids se match hone chahiye
const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Demos", href: "#demos" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Experience", href: "#experience" },
  { label: "Ask AI", href: "#ask-ai" },
  { label: "Contact", href: "#contact" },
];

// Logo z-20, right wala wrapper z-10: mobile menu panel (-z-10, wrapper ke andar) in dono ke NEECHE rehta hai.
// Server component — fixed top bar. Gradient isliye ki desk image ke upar text hamesha readable rahe.
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent">
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <a href="#" className="relative z-20 text-base font-semibold tracking-tight transition-colors hover:text-white md:text-lg">
          <Fx>Shiva</Fx> <span className="text-accent2"><Fx>Saini</Fx></span>
        </a>

        <div className="relative z-10 flex items-center gap-8">
          {/* Mobile pe links hide — wahan sirf Resume button dikhega */}
          <ul className="hidden items-center gap-8 text-sm text-ink md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-white focus-visible:text-white">
                  <Fx>{n.label}</Fx>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Theme option: desktop pe navbar me, mobile pe hamburger menu ke andar */}
            <div className="hidden md:block"><ThemeSwitcher /></div>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent2 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgb(var(--accent2)/0.4)] transition hover:brightness-110 hover:shadow-[0_0_26px_rgb(var(--accent2)/0.6)]"
            >
              <Fx tone="text-black">Free demo</Fx>
            </a>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:border-accent2 hover:bg-accent2 hover:text-black sm:inline-block"
            >
              <Fx tone="text-black">Resume</Fx>
            </a>
            {/* Mobile pe nav links ka menu (md se upar hide) */}
            <MobileMenu links={NAV} resume={SITE.resume} demo={SITE.whatsappUrl} />
          </div>
        </div>
      </nav>
    </header>
  );
}
