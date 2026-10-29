"use client";
import { useEffect, useState } from "react";
import { defaults, fetchContent, type Content } from "./content";

// Server se aaya `initial` turant dikhta hai; mount pe fresh data le aate hain (admin edits turant dikhein)
export function useContent(initial: Content = defaults): Content {
  const [content, setContent] = useState(initial);
  useEffect(() => { fetchContent().then(setContent).catch(() => {}); }, []);
  return content;
}
