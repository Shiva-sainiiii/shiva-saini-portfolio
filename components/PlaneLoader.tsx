"use client";
import dynamic from "next/dynamic";

// three.js sirf browser me aur page load ke baad aata hai (SSR / first paint / SEO pe asar nahi).
const FloatingPlane = dynamic(() => import("./FloatingPlane"), { ssr: false });
export default function PlaneLoader() { return <FloatingPlane />; }
