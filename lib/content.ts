import { supabase } from "./supabase";
import { PROJECTS, SITE, SKILLS } from "./data";

export type Project = { id: string; title: string; description: string; tech: string; image: string; live_url: string; code_url: string };
export type Skill = { id: string; name: string };
export type Cert = { id: string; title: string; issuer: string; image: string; link: string };
export type LinkItem = { id: string; label: string; url: string };
export type Content = { projects: Project[]; skills: Skill[]; certificates: Cert[]; links: LinkItem[] };

// Fallback: Supabase na ho ya table khaali ho to ye dikhega
export const defaults: Content = {
  projects: PROJECTS.map((p, i) => ({ id: String(i), title: p.title, description: p.desc, tech: "", image: "", live_url: "", code_url: "" })),
  skills: SKILLS.map((name) => ({ id: name, name })),
  certificates: [],
  links: SITE.links.map((l) => ({ id: l.label, label: l.label, url: l.href })),
};

/** Server (page.tsx, ISR) aur client (useContent) dono yahi use karte hain. Error pe throw karta hai. */
export async function fetchContent(): Promise<Content> {
  if (!supabase) return defaults;
  const get = (t: string) => supabase!.from(t).select("*").order("position").order("created_at");
  const res = await Promise.all([get("projects"), get("skills"), get("certificates"), get("links")]);
  if (res.some((r) => r.error)) throw new Error("content fetch failed");
  const [p, s, c, l] = res;
  return {
    projects: p.data?.length ? (p.data as Project[]) : defaults.projects,
    skills: s.data?.length ? (s.data as Skill[]) : defaults.skills,
    certificates: (c.data ?? []) as Cert[],
    links: l.data?.length ? (l.data as LinkItem[]) : defaults.links,
  };
}
