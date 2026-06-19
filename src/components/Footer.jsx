export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed &amp; Built with ❤️ by <strong>Shiva Saini</strong></p>
      <div className="footer-sub">
        <a href="https://github.com/Shiva-sainiiii/Shiva-Saini-Portfolio-" target="_blank" rel="noopener noreferrer">
          ⌥ View Source on GitHub
        </a>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} Shiva Saini. All rights reserved.</p>
    </footer>
  );
}
