import { site, wa } from "@/data/content";
export default function StickyBar() {
  return (<div className="sticky-bar"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href={`tel:${site.phone.replace(/\s/g, "")}`}>Call</a></div>);
}
