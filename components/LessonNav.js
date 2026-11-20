import Link from "next/link";

// Desktop par sticky sidebar, mobile par collapsible "Contents". Dono me same links.
function Body({ course, chapters, current, headings }) {
  return (
    <>
      <p className="tl">In this chapter</p>
      <ul className="tl-list">
        {headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
        <li><a href="#quiz-heading">Check yourself</a></li>
        <li><a href="#scorecard-area">Your progress</a></li>
      </ul>
      <p className="tl">All chapters</p>
      <ol className="tl-list num">
        {chapters.map((x) => (
          <li key={x.slug}><Link href={`/courses/${course}/${x.slug}`} className={x.slug === current ? "cur" : ""} aria-current={x.slug === current ? "page" : undefined}>{x.title}</Link></li>
        ))}
      </ol>
      <p className="tl"><Link href={`/courses/${course}`}>Course overview</Link> · <Link href="/courses">All courses</Link></p>
    </>
  );
}

export default function LessonNav(props) {
  return (
    <>
      <aside className="toc-side" aria-label="Table of contents"><Body {...props} /></aside>
      <details className="toc-mob"><summary>Contents and chapters</summary><Body {...props} /></details>
    </>
  );
}
